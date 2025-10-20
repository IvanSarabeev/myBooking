"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownNarrowWide } from "lucide-react";
import { accountRequestSortOptions } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

type SortAccountsProps = {
  selected: "oldest" | "latest";
  isDisabled: boolean;
};

const SortAccounts: FC<SortAccountsProps> = ({ selected, isDisabled }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams.toString());
  const currentSorting = urlParams.get("sort");
  const selectLabel =
    selected === "oldest" ? "Oldest Request" : "Newest Request";

  const handleSorting = (filter: "oldest" | "latest"): void => {
    if (filter) {
      urlParams.set("sort", filter);
    } else {
      urlParams.delete("sort");
    }

    urlParams.set("page", "1");
    router.push(`/admin/account-request?${urlParams.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isDisabled}
        className={
          "min-w-40 min-h-8 flex items-center justify-center gap-x-2 rounded-md border border-light-300 bg-white text-sm font-medium leading-5 tracking-tight text-dark-100 cursor-pointer"
        }
      >
        <span>{selectLabel}</span>
        <div>
          <span className="sr-only">Dropdown Icon</span>
          <ArrowDownNarrowWide size={16} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`min-w-40 text-base font-normal border-none leading-4 text-light-100 bg-dark-300`}
      >
        {accountRequestSortOptions?.map((item) => {
          const isActive = item.id === (currentSorting || selected);

          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleSorting(item.id)}
              className={`hover:bg-light-200 hover:text-dark-100 cursor-pointer ${isActive && "bg-primary-admin text-light-300"} `}
            >
              {item.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortAccounts;
