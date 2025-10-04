import { FC } from "react";
import BookCard from "@/components/BookCard";

type BorrowedBooksProps = {
  title: string;
  books: BorrowedBooks[];
  containerClassName?: string;
};

const BorrowedBooks: FC<BorrowedBooksProps> = ({
  title,
  books,
  containerClassName,
}) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-3xl text-light-100">{title}</h2>

      <ul className="book-list">
        {/*{books?.map((book) => (*/}
        {/*  <BookCard key={book.id} {...book} />*/}
        {/*))}*/}
      </ul>
    </section>
  );
};
export default BorrowedBooks;
