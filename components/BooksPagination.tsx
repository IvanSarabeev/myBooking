"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  query?: string;
  filter?: string;
  pageSize?: number;
  className?: string;
};

const BooksPagination: FC<PaginationProps> = ({
  pageSize = 12,
  currentPage,
  query,
  filter,
  totalItems,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return;

  /**
   * Updates the current page in the URL with the provided page number.
   *
   * @param {number} page - The page number to set in the URL query parameters.
   * @returns {void} - Update the current page and set the search params
   */
  const updatePage = (page: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    if (query) params.set("query", query);
    if (filter) params.set("filter", filter);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Pagination className={cn("mt-10 justify-center", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={cn(
              currentPage === 1 &&
                "pointer-events-none opacity-50 hover:scale-105 transition duration-300",
            )}
            onClick={(event) => {
              event.preventDefault();

              if (currentPage > 1) updatePage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {Array.from({ length: totalPages })?.map((_, i) => {
          const page = i + 1;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  updatePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={cn(
              currentPage === totalPages &&
                "pointer-events-none opacity-50 hover:scale-105 transition duration-300",
            )}
            onClick={(event) => {
              event.preventDefault();

              if (currentPage < totalPages) updatePage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BooksPagination;
