import { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { usersSchema } from "@/database/schemas/users";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const authSession = await auth();

  if (!authSession) redirect("/sign-in");

  after(async () => {
    if (!authSession.user?.id) return;

    // get the user and see if the last activity date is today
    const user = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, authSession.user?.id.toString()))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(usersSchema)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersSchema.id, authSession.user?.id.toString()));
  });

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
