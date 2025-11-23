import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { borrowedBookTableColumn } from "@/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import Link from "next/link";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type BorrowRequestTableProps = {
  borrowData: BorrowRequestData[];
};

const BorrowRequestTable: FC<BorrowRequestTableProps> = ({ borrowData }) => {
  return (
    <Table className="rounded-lg overflow-hidden">
      <TableHeader className="text-sm font-medium bg-[#F8F8FF]">
        <TableRow className="border-b border-[#EDF1F1]">
          {borrowedBookTableColumn.map((item) => (
            <TableHead
              key={item.id}
              className={`${item.style} text-sm text-[#3A354E] font-normal leading-5 tracking-tight py-3 px-2.5`}
            >
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {borrowData?.map((borrow) => {
          const borrowedDate = dayjs(borrow.borrowDate).format("MMM DD YYYY");
          const returnDate = dayjs(borrow.returnDate).format("MMM DD YYYY");
          const dueDate = dayjs(borrow.dueDate).format("MMM DD YYYY");

          return (
            <TableRow
              key={borrow.id}
              className="text-sm font-medium leading-5 tracking-tight text-dark-100 border-b border-[#F8F8FF] transition"
            >
              <TableCell>
                {borrow.book?.coverColor ||
                  (borrow.book?.coverUrl && (
                    <Link
                      href={`/admin/books/${borrow.book.id}`}
                      className="size-full flex items-center gap-x-2.5"
                    >
                      <BookCover
                        variant="extraSmall"
                        coverColor={borrow.book.coverColor}
                        coverImage={borrow.book.coverUrl}
                      />
                      <p className="font-medium truncate">
                        {borrow.book.title}
                      </p>
                    </Link>
                  ))}
              </TableCell>

              <TableCell className="flex items-center gap-x-2.5 py-4 px-2.5">
                <Avatar>
                  <AvatarFallback className="bg-primary-admin text-light-100">
                    {getNameInitials(
                      borrow.user?.fullName ? borrow.user?.fullName : "N/A",
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-y-1">
                  <div className="font-medium">
                    {borrow.user?.fullName ? borrow.user.fullName : "-"}
                  </div>
                  <p className="text-xs text-gray-500">
                    {borrow.user?.email ? borrow.user.email : "-"}
                  </p>
                </div>
              </TableCell>

              <TableCell>{borrow.status}</TableCell>
              <TableCell>{borrowedDate}</TableCell>
              <TableCell>{returnDate}</TableCell>
              <TableCell>{dueDate}</TableCell>
              <TableCell>
                <Button variant="outline" className="size-fit">
                  <Image
                    src="/icons/admin/receipt.svg"
                    alt="receipt"
                    height={20}
                    width={20}
                  />
                  Generate
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BorrowRequestTable;
