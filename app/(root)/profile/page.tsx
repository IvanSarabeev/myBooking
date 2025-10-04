import { FC, Fragment } from "react";
import { auth, signOut } from "@/auth";
import { getBorrowedBooks } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import BorrowedBooks from "@/components/BorrowedBooks";

const ProfilePage: FC = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  /**
   * This is an asynchronous function that handles user logout operations.
   * It uses server-side functionality to securely sign the user out of their session.
   *
   * @returns {Promise<void>} A promise that resolves once the user has been successfully logged out.
   */
  const handleLogout = async (): Promise<void> => {
    "use server";

    return await signOut();
  };

  const userId = session.user.id;
  const borrowedBooks = await getBorrowedBooks(userId);

  return (
    <Fragment>
      <BorrowedBooks
        title={"Borrowed books"}
        books={borrowedBooks}
        containerClassName="mt-20"
      />
    </Fragment>
  );
};
export default ProfilePage;
