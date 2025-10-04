import { FC } from "react";
import BookCard from "@/components/BookCard";

type BookListProps = {
  title: string;
  books: Book[];
  containerClassName?: string;
};

const BookList: FC<BookListProps> = ({ title, books, containerClassName }) => {
  if (books.length < 2) return;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books?.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
