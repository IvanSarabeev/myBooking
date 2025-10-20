import { FC } from "react";
import TableSortOptions from "@/components/TableSortOptions";
import { allUsersSortOptions } from "@/constants";

type UsersPageProps = {
  searchParams: Promise<{ page?: string; sort?: AllUsersSortOptions }>;
};

const UsersPage: FC<UsersPageProps> = async ({ searchParams }) => {
  const urlParams = await searchParams;
  const page = Number(urlParams.page ?? 1);
  const sort = (urlParams.sort as AllUsersSortOptions) ?? "alphabetical";

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
    </section>
  );
};

export default UsersPage;
