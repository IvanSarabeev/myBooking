import { FC, Fragment } from "react";
import { auth } from "@/auth";
import { getBorrowedBooks } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import BorrowedBooks from "@/components/BorrowedBooks";
import ProfileInfo from "@/components/ProfileInfo";

const ProfilePage: FC = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const userId = session.user.id;
  const borrowedBooks = await getBorrowedBooks(userId);

  return (
    <Fragment>
      <section className="flex flex-col lg:flex-row items-start gap-y-6 lg:gap-x-10">
        <ProfileInfo userId={userId} />

        <BorrowedBooks title={"Borrowed books"} books={borrowedBooks} />
      </section>
    </Fragment>
  );
};
export default ProfilePage;
