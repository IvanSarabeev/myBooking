import { FC, Fragment } from "react";
import { getRequestedUsers } from "@/lib/admin/actions/users";
import AccountRequestTable from "@/components/admin/AccountRequestTable";
import AdminPagination from "@/components/admin/AdminPagination";
import TableSortOptions from "@/components/TableSortOptions";
import { accountRequestSortOptions } from "@/constants";

type AccountRequestPageProps = {
  searchParams: Promise<{ page?: string; sort?: "latest" | "oldest" }>;
};

const AccountRequestPage: FC<AccountRequestPageProps> = async ({
  searchParams,
}) => {
  const urlParams = await searchParams;
  const page = Number(urlParams.page ?? 1);
  const sort = (urlParams.sort as "latest" | "oldest") ?? "latest";

  const { success, data, meta } = await getRequestedUsers(page, sort);

  if (!success) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg bg-white text-red-500">
        Failed to fetch account requests.
      </div>
    );
  }

  if (!data && !Array.isArray(data)) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg bg-white text-gray-500">
        No pending account requests.
      </div>
    );
  }

  return (
    <section className="max-w-6xl flex flex-col gap-y-5 rounded-[14px] p-5 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-[26px] tracking-normal text-dark-100">
          Account Registration Requests
        </h1>

        <TableSortOptions<AccountRequestSortOptions>
          options={accountRequestSortOptions}
          variants="base"
        />
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <Fragment>
          <AccountRequestTable users={data} />

          <AdminPagination
            currentPage={meta?.page as number}
            totalPages={meta?.totalPages as number}
            basePath="/admin/account-request"
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

export default AccountRequestPage;
