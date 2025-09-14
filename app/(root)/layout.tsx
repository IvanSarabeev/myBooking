import { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const authSession = await auth();

  if (!authSession) redirect("/sign-in");

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header sessionDetails={authSession} />

        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
