import { FC, Fragment } from "react";
import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import BookDetails from "@/components/BookDetails";
import BackButton from "@/components/admin/BackButton";

type BookOverviewProps = Book & {};

const BookOverview: FC<BookOverviewProps> = ({
  title,
  author,
  genre,
  coverColor,
  coverUrl,
  videoUrl,
  summary,
}) => {
  return (
    <Fragment>
      <BackButton className="mb-4" />

      <section className="book-overview max-w-5xl">
        <div className="flex flex-1 gap-5 max-h-56 size-fit">
          <div className="min-w-64 min-h-56 relative flex items-center justify-center">
            <div
              style={{ backgroundColor: coverColor }}
              className="absolute inset-0 w-full opacity-40 rounded-lg"
            />
            <BookCover
              variant="medium"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
          <div className="w-full max-w-[422px] flex flex-col items-start gap-y-4">
            <p className="flex items-center gap-3.5 text-dark-700 text-lg font-normal">
              Created at:{" "}
              <Image
                src="/icons/admin/calendar.svg"
                alt="created at"
                height={20}
                width={20}
              />{" "}
              <span className="text-base font-normal text-[#3A354E]">
                12/01/24
              </span>
            </p>
            <p className="text-2xl font-semibold leading-8 text-[#1E293B]">
              {title}
            </p>
            <p className="text-lg font-semibold leading-6 text-[#3A354E]">
              {author}
            </p>
            <p className="text-base font-normal text-[#64748B]">{genre}</p>
            <Button className="w-full min-h-11 rounded-md text-light-100 text-sm leading-6 font-bold bg-primary-admin cursor-pointer">
              <Image
                src="/icons/admin/edit.svg"
                alt="edit book"
                height={16}
                width={16}
              />
              Edit Book
            </Button>
          </div>
        </div>
      </section>

      <BookDetails summary={summary} videoUrl={videoUrl} variant="dark" />
    </Fragment>
  );
};

export default BookOverview;
