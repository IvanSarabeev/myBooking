import { FC, Fragment } from "react";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import BooksPagination from "@/components/BooksPagination";
import { getBooks } from "@/lib/actions/book";

type PageProps = {
  searchParams: {
    query?: string;
    filter?: string;
    page?: number;
  };
};

const Page: FC<PageProps> = async ({ searchParams }) => {
  const query = searchParams?.query ?? "";
  const filter = (searchParams?.filter ?? "all") as FilterOptions;
  const page = searchParams?.page ?? 1;

  const { data: books, total } = await getBooks(query, filter, page);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="size-fit max-w-6xl px-6 py-10 text-light-100 flex flex-col gap-3.5 mx-auto font-ibm-plex-sans text-center">
        <p className="font-semibold text-lg/8 tracking-[10%]">
          DISCOVER YOUR NEXT GREAT READ:
        </p>
        <h1 className="text-5xl tracking-tight">
          Explore and Search for <br />
          <strong className="text-light-200">Any Book</strong> In Our Library
        </h1>

        <SearchBar
          query={query}
          placeholder="Search by title, author, or genre..."
          containerWrapper="search"
          inputClassName="search-input text-xl leading-5 pl-6 border-none focus-visible:ring-0 focus-visible:ring-yellow-400"
        />
      </section>
      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <Fragment>
          <BookList
            title="Search Results"
            books={books}
            containerClassName="mt-14 lg:min-w-7xl"
            hasFilter
            filter={filter}
            query={query}
          />

          <BooksPagination
            currentPage={page}
            totalItems={total}
            query={query}
            filter={filter}
          />
        </Fragment>
      )}
    </main>
  );
};

export default Page;
