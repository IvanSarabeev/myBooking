import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import dayjs from "dayjs";
import BookCover from "@/components/BookCover";
import { getBooks } from "@/lib/admin/actions/book";
import Link from "next/link";
import { bookTableColumns } from "@/constants";

const BooksTable: FC = async () => {
  const books = await getBooks();

  return (
    <Table className="w-full h-fit max-w-6xl rounded-md">
      <TableHeader className="rounded-t-lg border-b border-[#EDF1F1] rounded text-sm font-normal leading-5 tracking-tighter bg-light-300">
        {bookTableColumns.map((item) => (
          <TableHead key={item.id} className={`${item.style} py-4 p-2.5`}>
            {item.title}
          </TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {books.map((book) => {
          const createdAt = dayjs(book.createdAt).format("MMM DD YYYY");

          return (
            <TableRow
              key={book.id}
              className="text-sm font-medium leading-5 tracking-tight text-dark-100 border-b border-[#F8F8FF] transition"
            >
              <TableCell className="flex items-center gap-x-1.5 font-semibold text-[#1E293B] cursor-pointer">
                <BookCover
                  variant="extraSmall"
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                />
                <Link
                  href={`/admin/books/${book.id}`}
                  target="_self"
                  className="size-full"
                >
                  {book.title}
                </Link>
              </TableCell>
              <TableCell className="px-2.5 py-4">{book.author}</TableCell>
              <TableCell className="px-2.5 py-4">{book.genre}</TableCell>
              <TableCell className="px-2.5 py-4">{createdAt}</TableCell>
              <TableCell className="flex gap-x-4 px-2.5 py-4">
                <Link href={`/admin/books/edit/${book.id}`}>
                  <Image
                    src="/icons/admin/edit.svg"
                    alt="edit book"
                    height={20}
                    width={20}
                    loading="lazy"
                    decoding="async"
                    className="cursor-pointer transition hover:scale-105 duration-300"
                  />
                </Link>
                <Image
                  src="/icons/admin/trash.svg"
                  alt="edit book"
                  height={20}
                  width={20}
                  loading="lazy"
                  decoding="async"
                  className="cursor-pointer transition hover:scale-105 duration-300"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BooksTable;
