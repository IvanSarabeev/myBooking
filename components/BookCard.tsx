"use client";

import { FC, Fragment } from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

type BaseBookProps = Pick<
  Book,
  "id" | "title" | "genre" | "coverColor" | "coverUrl"
>;

type BorrowBookProps = BaseBookProps & {
  borrowed?: Pick<
    BorrowedBooks,
    "borrowDate" | "dueDate" | "returnDate" | "status"
  >;
};

const BookCard: FC<BorrowBookProps> = ({
  id,
  title,
  genre,
  coverUrl,
  coverColor,
  borrowed,
}) => {
  const pathname = usePathname();

  const isProfilePathname = pathname.includes("/profile");

  const isLoanedBook = borrowed?.status === "BORROWED";
  const isBookReturned = borrowed?.status === "RETURNED";

  const borrowedDate =
    borrowed?.borrowDate && dayjs(borrowed.borrowDate).format("MMM DD, YYYY");
  const returnDaysLeft =
    borrowed?.returnDate &&
    dayjs(borrowed.returnDate).diff(dayjs(), "days").toString();
  const overdueDate =
    borrowed?.dueDate && dayjs(borrowed.dueDate).format("MMM DD, YYYY");

  const returnImage = isBookReturned
    ? "/icons/tick.svg"
    : returnDaysLeft === overdueDate
      ? ""
      : "/icons/calendar.svg";

  return (
    <li
      className={cn(
        isLoanedBook &&
          "borrowed-book_wrapper bg-gradient-to-r from-[#12141D] to-[#12151F]",
        "transform duration-300 hover:scale-105",
      )}
    >
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        {isProfilePathname ? (
          <div className="relative px-12 py-6">
            <div
              className={`absolute inset-0 size-full opacity-40 rounded-[10px]`}
              style={{ backgroundColor: coverColor }}
            />
            <BookCover
              coverColor={coverColor}
              coverImage={coverUrl}
              variant={"medium"}
            />
          </div>
        ) : (
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        )}

        <div
          className={cn(
            "mt-4",
            !isLoanedBook ? "sm:max-w-40 max-w-28" : "w-full",
          )}
        >
          <p className="book-title">{title}</p>
          <p className="text-light-100 book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <Fragment>
            {borrowedDate !== undefined && (
              <div className="mt-3 w-full">
                <div className="book-loaned">
                  <Image
                    src="/icons/book-2.svg"
                    alt="book"
                    width={18}
                    height={18}
                    loading="lazy"
                    className="object-contain"
                  />
                  <p className="text-light-100">Borrowed on {borrowedDate}</p>
                </div>
              </div>
            )}

            <div className="mt-3 w-full flex justify-between items-center gap-2">
              {/*Check if the Overdue Date is passed...*/}
              <div className="book-loaned">
                <Image
                  src={returnImage}
                  alt="calendar"
                  width={18}
                  height={18}
                  loading="lazy"
                  className="object-contain"
                />

                <p className="text-light-100">
                  {returnDaysLeft} days left to due
                </p>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    style={{
                      backgroundColor: coverColor,
                    }}
                    className="size-[26px] p-1 rounded-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src="/icons/receipt.svg"
                      alt="receipt"
                      height={26}
                      width={26}
                    />
                    <span className="sr-only">Download receipt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download receipt</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Fragment>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
