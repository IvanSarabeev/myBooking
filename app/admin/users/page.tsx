import { FC, Fragment } from "react";
import TableSortOptions from "@/components/TableSortOptions";
import { allUsersSortOptions } from "@/constants";
import { getUsers } from "@/lib/admin/actions/users";
import { toast } from "sonner";
import AdminPagination from "@/components/admin/AdminPagination";
import UsersTable from "@/components/admin/users/UsersTable";

type UsersPageProps = {
  searchParams: Promise<{ page?: string; sort?: AllUsersSortOptions }>;
};

const UsersPage: FC<UsersPageProps> = async ({ searchParams }) => {
  const urlParams = await searchParams;
  const page = Number(urlParams.page ?? 1);
  const sort = (urlParams.sort as AllUsersSortOptions) ?? "alphabetical";

  const { success, data, meta, message } = await getUsers(page, sort);

  if (!success) {
    toast.error("Error", {
      description: message,
      style: {
        backgroundColor: "red",
      },
    });

    return (
      <div className="flex h-40 items-center justify-center rounded-lg bg-white text-red-500">
        Failed getting users
      </div>
    );
  }

  if (!data && !Array.isArray(data)) {
    return (
      <div className="flex h-40 items-center justify-center rounded-Belgrano bg-white text-red-500">
        No users
      </div>
    );
  }

  return (
    <section className="max-w-6xl flex flex-col gap-y-5 rounded-[14px] p-5 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-[26px] tracking-normal text-dark-100">
          All Users
        </h1>

        <TableSortOptions<AllUsersSortOptions>
          options={allUsersSortOptions}
          variants="base"
        />
      </div>

      {Array.isArray(data) && data.length > 0 ? (
        <Fragment>
          <UsersTable users={data} />

          <AdminPagination
            currentPage={meta?.page as number}
            totalPages={meta?.totalPages as number}
            basePath="/admin/users"
          />
        </Fragment>
      ) : (
        <div className="py-8.text-center text-gray-500">No users found.</div>
      )}
    </section>
  );
};

export default UsersPage;
