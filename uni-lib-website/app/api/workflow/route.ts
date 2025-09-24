import { db } from "@/database/drizzle"
import { usersTable } from "@/database/schema"
import config from "@/lib/config"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

type InitialData = {
  email: string,
  fullName: string
}

type UserState = "non-active" | "active"

const ONEDAY_IN_MS = 24 * 60 * 60 * 1000
const THREEDAY_IN_MS = 3 * ONEDAY_IN_MS

const getUserState = async (email: string): Promise<UserState> => {
  // query the lastActivityDate of the user in database
  const user = await db
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.email, email))
                    .limit(1)
  // translate the date into milliseconds to calculate the difference
  const lastActivityDate = user[0].lastActivityTime.getTime()
  const today = (new Date()).getTime()
  // if lastActivityDate is less than 3 days ago (active)
  if(today - lastActivityDate < THREEDAY_IN_MS)
    return "active"
  // if lastActivityDate is 3 days ago (non-active)
  return "non-active"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload
  const { welcomeTemplateID, nonActiveTemplateID } = config.env.emailJS
  await context.run("new-signup", async () => {
    await sendEmail(email, fullName, welcomeTemplateID)
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(email, fullName, nonActiveTemplateID)
      })
    } 
    
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})


