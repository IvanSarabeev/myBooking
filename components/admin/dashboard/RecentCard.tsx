import { FC } from "react";
import Link from "next/link";
import { Dot, PlusIcon } from "lucide-react";
import BookCover from "@/components/BookCover";
import dayjs from "dayjs";
import Image from "next/image";

type RecentCardProps = {
  title: string;
  books: Book[];
};

const RecentCard: FC<RecentCardProps> = ({ title, books }) => {
  return (
    <div className="max-h-[746px] size-full flex flex-col p-4 gap-4 rounded-2xl border border-[#EDF1F1]  bg-white">
      <div className="h-fit w-full flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-normal leading-7 text-[#1E293B]">
          {title}
        </h4>

        <Link
          href="/admin/books"
          className="w-fit h-9 rounded-lg py-2 px-3 text-center text-[#25388C] text-sm font-semibold leading-5 tracking-normal cursor-pointer transition duration-300 hover:scale-105 bg-[#F8F8FF]"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-7">
        <div className="size-full flex items-center gap-3.5 py-3.5 px-4 rounded-lg border border-[#F8F8FF] shadow-sm bg-[#1823220D]">
          <Link
            href="/admin/books/new"
            className="group size-12 flex items-center justify-center rounded-full shadow-sm shadow-primary-admin bg-white hover:shadow-none hover:scale-105 duration-300 transition transform hover:bg-primary-admin"
          >
            <PlusIcon
              height={24}
              width={24}
              className="group-hover:text-white text-[#4F7471] transition duration-300"
            />
          </Link>

          <p className="font-medium text-lg leading-6 tracking-tighter text-[#1E293B]">
            Add New Book
          </p>
        </div>

        {books?.map((book) => {
          const createdAtDate = dayjs(book.createdAt).format("MMM DD YYYY");

          return (
            <Link
              key={book.id}
              target="_self"
              href={`/admin/books/${book.id}`}
              className="size-full flex flex-col sm:flex-row gap-3 transition duration-300 rounded-lg shadow-2xs hover:shadow-sm hover:shadow-primary-admin hover:scale-105"
            >
              <BookCover
                variant="small"
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
              />
              <div className="flex flex-col items-start gap-y-1">
                <h5 className="text-base font-semibold text-[#1E293B]">
                  {book.title}
                </h5>
                <span className="flex items-center gap-x-2 text-sm font-normal text-[#64748B]">
                  <p>{book.author}</p>
                  <Dot className="size-1 bg-[#8C8E98]" />
                  <p>{book.genre}</p>
                </span>
                <span className="flex items-center gap-x-0.5">
                  <Image
                    src="/icons/admin/calendar.svg"
                    alt="calendar"
                    height={16}
                    width={16}
                    loading="lazy"
                    decoding="async"
                  />

                  <p className="text-xs font-normal text-[#3A354E]">
                    {createdAtDate}
                  </p>
                </span>
              </div>
            </Link>
          );
        }) ?? <div>There no recently added Books</div>}
      </div>
    </div>
  );
};

export default RecentCard;
