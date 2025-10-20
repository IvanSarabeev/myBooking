"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide } from "lucide-react";

interface TableSortOptionsProps<T extends string> {
  options: SortOption<T>[];
  variants: "md" | "base";
  dropdownStyle?: string;
  isDisabled?: boolean;
  basePath?: string;
}

const TableSortOptions = <T extends string>({
  options,
  variants = "base",
  dropdownStyle,
  isDisabled,
  basePath,
}: TableSortOptionsProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams.toString());
  const currentSortOption = urlParams.get("sort") as T | null;

  const handleSelectedOption = (id: T) => {
    if (id) {
      urlParams.set("sort", id);
    } else {
      urlParams.delete("sort");
    }

    // Always reset pagination when the sorting option is changed
    urlParams.set("page", "1");
    router.push(`${basePath ?? pathname}?${urlParams.toString()}`);
  };

  const selectedOption =
    options.find((option) => option.id === currentSortOption) ?? options[0];

  const contentAlignment = variants === "base" ? "end" : "center";
  const contentStyles =
    variants === "base"
      ? "min-w-40 text-base font-normal border-none leading-4 text-light-100 bg-dark-300"
      : "min-w-40 text-base font-normal border-none leading-4 text-light-100 bg-dark-300";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isDisabled}
        className={cn(
          dropdownStyle,
          "min-w-40 min-h-8 flex items-center justify-center gap-x-2 rounded-md border border-light-300 bg-white text-sm font-medium leading-5 tracking-tight text-dark-100 cursor-pointer",
        )}
      >
        <span>{selectedOption.title ?? "All"}</span>
        <ArrowDownNarrowWide size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align={contentAlignment} className={contentStyles}>
        {options?.map((item, index) => {
          const isActive = item.id === currentSortOption;

          return (
            <DropdownMenuItem
              key={index}
              onClick={() => handleSelectedOption(item.id)}
              className={cn(
                "hover:bg-light-200 hover:text-dark-100 cursor-pointer",
                isActive && "bg-primary-admin text-light-300",
              )}
            >
              {item.title ?? ""}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableSortOptions;
