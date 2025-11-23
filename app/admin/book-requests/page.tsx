import { FC, Fragment } from "react";
import { getBorrowedBooks } from "@/lib/admin/actions/book";
import TableSortOptions from "@/components/TableSortOptions";
import { borrowedRequestSortOptions } from "@/constants";
import AdminPagination from "@/components/admin/AdminPagination";
import BorrowRequestTable from "@/components/admin/borrow-requests/BorrowRequestTable";

const Page: FC = async () => {
  const { data, meta } = await getBorrowedBooks();

  return (
    <section className="max-w-6xl flex flex-col gap-y-5 rounded-[14px] p-5 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-[26px] tracking-normal text-dark-100">
          Borrow Book Requests
        </h1>

        <TableSortOptions<BorrowedBooksSortOptions>
          options={borrowedRequestSortOptions}
          variants="base"
        />
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <Fragment>
          <BorrowRequestTable borrowData={data} />

          <AdminPagination
            currentPage={meta?.page as number}
            totalPages={meta?.totalPages as number}
            basePath="/admin/book-requests"
          />
        </Fragment>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No pending requests found.
        </div>
      )}
    </section>
  );
};

export default Page;
