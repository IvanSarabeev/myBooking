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
        {books?.map((borrowed) => (
          <BookCard
            key={borrowed.id}
            borrowed={{
              borrowDate: borrowed.borrowDate,
              dueDate: borrowed.dueDate,
              returnDate: borrowed.returnDate,
              status: borrowed.status,
            }}
            {...borrowed.books}
          />
        ))}
      </ul>
    </section>
  );
};
export default BorrowedBooks;
