import { Fragment } from "react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { auth } from "@/auth";
import { getLatestBooks } from "@/database/queries/books";

const Home = async () => {
  const session = await auth();

  const latestBooks = await getLatestBooks(13);

  return (
    <Fragment>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </Fragment>
  );
};

export default Home;
