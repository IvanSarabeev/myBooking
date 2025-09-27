import { FC, Fragment } from "react";
import { redirect } from "next/navigation";
import { getBookById, getLatestBooks } from "@/database/queries/books";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";
import BookList from "@/components/BookList";

type Props = {
  params: Promise<{ id: string }>;
};

const Page: FC<Props> = async ({ params }) => {
  const id = (await params)?.id;
  const session = await auth();

  const bookDetails = await getBookById(id);
  const similarBooks = await getLatestBooks();

  if (!bookDetails) redirect("/404");

  return (
    <Fragment>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-lg text-light-100">
              {bookDetails.summary.split("\n")?.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        <BookList
          title="More similar books"
          books={similarBooks.slice(1, 7)}
          containerClassName="max-w-lg"
        />
      </div>
    </Fragment>
  );
};

export default Page;
