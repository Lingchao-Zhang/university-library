import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({
  children
}: {
  children: ReactNode;
}) => {
  const session = await auth()
  
  if(!session){
    redirect("/sign-in")
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