import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

const RootLayout = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    <main className="container">
      <div className="mx-25 max-sm:mx-4">
        <Navbar />
        {children}
      </div>
    </main>
  );
}

export default RootLayout