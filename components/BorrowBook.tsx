"use client";

import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type BorrowBookProps = {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  } | null;
};

const BorrowBook: FC<BorrowBookProps> = ({
  bookId,
  userId,
  borrowingEligibility,
}) => {
  const handleBookBorrowing = () => {};

  return (
    <Button className="book-overview_btn">
      <Image
        src="/icons/book.svg"
        alt="book"
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
      />

      <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
    </Button>
  );
};

export default BorrowBook;
