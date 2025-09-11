import Image from "next/image";
import { ReactNode } from "react";
import illustrationImage from "@/public/images/auth-illustration.png"
import webLogo from "@/public/icons/logo.svg"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const RootLayout = async ({
  children
}: {
  children: ReactNode;
}) => {
  const session = await auth()
  if(session){
    redirect("/")
  }
  return (
    <main className="auth-container">
        <section className="gradient-dark auth-form-container">
             <div className="flex gap-2">
                <Image 
                 src={webLogo}
                 alt="website logo"
                 width={40}
                 height={32}
                />
                <span className="text-28-semibold-white my-2">BookWise</span>
            </div>
            {children}
        </section>
        <section className="auth-illustration">
            <Image 
                src={illustrationImage}
                alt="auth-illustration-image"
                width={912}
                height={1110}
                className="w-full object-cover"
            />
        </section>
    </main>
  );
}

export default RootLayout