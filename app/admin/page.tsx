import { FC } from "react";
import OverviewCard from "@/components/admin/dashboard/OverviewCard";
import RequestCard from "@/components/admin/dashboard/RequestCard";
import RecentCard from "@/components/admin/dashboard/RecentCard";
import { getBooks } from "@/lib/admin/actions/book";
import { getRecentAccountRequests } from "@/lib/admin/actions/users";

const BOOKS_PER_VIEW = 5;
const ACCOUNT_REQUESTS_PER_VIEW = 6;

const Page: FC = async () => {
  const recentAddedBooks: Book[] = await getBooks(BOOKS_PER_VIEW, "Latest");
  const { data } = await getRecentAccountRequests(ACCOUNT_REQUESTS_PER_VIEW);

  const hasRecentBooks = recentAddedBooks && recentAddedBooks.length > 0;

  return (
    <section className="max-w-6xl flex flex-col gap-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <OverviewCard
          title="Borrowed Books"
          value={145}
          change={2}
          trend="down"
        />
        <OverviewCard title="Total Users" value={317} change={4} trend="up" />
        <OverviewCard title="Total Books" value={163} change={2} trend="up" />
      </div>
      <div
        className={`size-full grid grid-cols-1 ${hasRecentBooks && "sm:grid-cols-2"} gap-y-4 gap-x-2`}
      >
        <div className="size-fit flex flex-col items-start justify-start gap-y-4">
          <RequestCard
            type="borrow"
            title="Borrow Requests"
            description="No Pending Book Requests"
            message="There are no borrow book requests awaiting your review at this time."
            link="/admin/borrow-requests"
          />
          <RequestCard
            type="account"
            title="Account Requests"
            description="No Pending Account Requests"
            message="There are currently no account requests awaiting approval."
            link="/admin/account-requests"
            items={data}
          />
        </div>
        <RecentCard title="Recently Added Books" books={recentAddedBooks} />
      </div>
    </section>
  );
};

export default Page;
