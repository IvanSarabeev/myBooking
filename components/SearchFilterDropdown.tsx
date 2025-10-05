"use client";

import { Dispatch, FC, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { filterOptions } from "@/constants";

type SearchFilterDropdownProps = {
  title: string;
  selected: FilterOptions;
  onSelect: Dispatch<
    SetStateAction<"all" | "author" | "rating" | "title" | "genre">
  >;
};

const SearchFilterDropdown: FC<SearchFilterDropdownProps> = ({
  title,
  selected,
  onSelect,
}) => {
  const router = useRouter();
  const searchParms = useSearchParams();

  const params = new URLSearchParams(searchParms.toString());
  const currentFilter = params.get("filter") as FilterOptions | null;

  /**
   * Updates the search filter query parameter and navigates to the updated search URL.
   *
   * @param {FilterOptions} filter - The selected filter option. If the filter is not "all" or undefined,
   * it will be added to the query parameters. Otherwise, the filter query parameter will be removed.
   * @returns {void} - Update the URL searchParms
   */
  const handleSearchFilter = (filter: FilterOptions): void => {
    if (filter && filter !== "all") {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }

    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
    onSelect(filter);
  };

  const selectedLabel =
    filterOptions.find((item) => item.id === (currentFilter || selected))
      ?.title ?? "All";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "min-w-[212px] min-h-9 flex items-center justify-center gap-x-1 rounded-md text-base font-normal leading-[18px] bg-dark-300 text-light-100"
        }
      >
        {title}:{" "}
        <span className="text-light-200 font-semibold leading-4 tracking-tight">
          {selectedLabel}
        </span>
        <div>
          <span className="sr-only">Dropdown Icon</span>
          <ArrowDown height={18} width={18} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`min-w-40 text-base font-normal border-none leading-4 text-light-100 bg-dark-300`}
      >
        {filterOptions?.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === (currentFilter || selected);

          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleSearchFilter(item.id)}
              className={`hover:bg-light-200 hover:text-dark-100 cursor-pointer ${isActive && "bg-light-200 text-dark-100"} `}
            >
              <Icon size={16} className="shrink-0" />
              {item.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchFilterDropdown;
