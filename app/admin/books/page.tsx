import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BooksTable from "@/components/admin/BooksTable";
import { ArrowDownNarrowWide } from "lucide-react";

const Page: FC = () => {
  return (
    <section className="w-full max-w-6xl rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All books</h2>

        <div className="size-fit flex items-center gap-5">
          <Button className="flex items-center gap-2 py-1.5 px-3 text-dark-100 text-sm tracking-tight border border-[#F8F8FF] bg-white cursor-pointer hover:text-light-100 hover:bg-primary-admin">
            A-Z
            {/*  TODO: Create a Sorting Filter for Admin book list*/}
            <ArrowDownNarrowWide />
          </Button>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-light-100">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BooksTable />
      </div>
    </section>
  );
};

export default Page;
