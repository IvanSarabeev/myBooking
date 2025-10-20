"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

const AdminPagination: FC<AdminPaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  // Helper to generate visible page numbers (with ellipsis)
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage - delta > 1) pages.unshift("...");
    if (currentPage + delta < totalPages) pages.push("...");
    if (!pages.includes(1)) pages.unshift(1);
    if (!pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleNavigate(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handleNavigate(Number(page))}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleNavigate(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AdminPagination;
