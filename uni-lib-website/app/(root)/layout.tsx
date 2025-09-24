import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { eq } from "drizzle-orm"

const RootLayout = async ({
  children
}: {
  children: ReactNode;
}) => {
  const session = await auth()
  if(!session){
    redirect("/sign-in")
  } 
  // Update user lastActivityDate only once a day when user sign in
  if(session.user?.email) {
    const user = await db
                       .select()
                       .from(usersTable)
                       .where(eq(usersTable.email, session.user?.email))
                       .limit(1)
    // only get day/month/year of the time
    const lastActivityDate = user[0].lastActivityTime.toString().slice(4,15) 
    const today = (new Date()).toString().slice(4,15)
    if(lastActivityDate !== today){
      await db
            .update(usersTable)
            .set({ lastActivityTime: new Date()})
    } 
  }
  return (
    <main className="container">
      <div className="mx-25 max-sm:mx-4">
        <Navbar userName={session?.user?.name || "LZ"} userId={session?.user?.id || ""}/>
        {children}
      </div>
    </main>
  );
}

export default RootLayout