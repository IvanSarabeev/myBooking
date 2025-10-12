import { FC, Fragment } from "react";
import { getBookById } from "@/database/queries/books";
import BookOverview from "@/components/admin/BookOverview";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const BookDetailsPage: FC<BookDetailsPageProps> = async ({ params }) => {
  const id = (await params)?.id;

  const bookDetails = await getBookById(id);

  if (!bookDetails) return null;

  return (
    <Fragment>
      <BookOverview {...bookDetails} />
    </Fragment>
  );
};

export default BookDetailsPage;
