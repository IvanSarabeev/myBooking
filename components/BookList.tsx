"use client";

import { FC, useEffect, useState, useTransition } from "react";
import BookCard from "@/components/BookCard";
import SearchFilterDropdown from "@/components/SearchFilterDropdown";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import BooksListSkeleton from "@/components/BooksListSkeleton";

type BookListProps = {
  title: string;
  books: Book[];
  containerClassName?: string;
  hasFilter?: boolean;
  filter?: string;
  query?: string;
};

const BookList: FC<BookListProps> = ({
  title,
  books,
  containerClassName,
  hasFilter = false,
  filter = "all",
  query = "",
}) => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<FilterOptions>(
    (filter as any) || "all",
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => setIsLoading(false), 400);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (!books || (books.length < 2 && !isLoading && !hasFilter)) {
    return <EmptyState />;
  }

  return (
    <section className={containerClassName}>
      <div className="w-full h-fit flex items-center justify-between">
        <h2 className="font-bebas-neue text-4xl text-light-100">
          {title}{" "}
          {query.length > 0 && <span className="text-light-200">{query}</span>}
        </h2>
        {hasFilter && (
          <SearchFilterDropdown
            title="Filter by"
            selected={selected}
            onSelect={(value) => {
              startTransition(() => {
                setSelected(value);
              });
            }}
          />
        )}
      </div>

      {isLoading || isPending ? (
        <BooksListSkeleton />
      ) : (
        <ul className="book-list">
          {books?.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default BookList;
