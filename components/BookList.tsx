import React, { FC } from "react";
import { cn } from "@/lib/utils";

type BookListProps = {
  title: string;
  books: Book[];
  containerClassName?: string;
};

const BookList: FC<BookListProps> = ({ title, books, containerClassName }) => {
  return (
    <section className={cn("", containerClassName)}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
    </section>
  );
};

export default BookList;
