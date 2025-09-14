import { FC, Fragment } from "react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const ProfilePage: FC = () => {
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

  return (
    <Fragment>
      <form action={handleLogout} className="mb-10">
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </Fragment>
  );
};
export default ProfilePage;
