"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { borrowBook } from "@/lib/actions/book";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
  const router = useRouter();

  const [borrowing, setBorrowing] = useState(false);

  const handleBookBorrowing = async () => {
    if (borrowing) return;
    setBorrowing(true);

    try {
      const { success, message } = await borrowBook({ bookId, userId });

      if (success) {
        toast.success("Success", {
          description: message,
          style: {
            background: "green",
          },
        });

        router.push("/profile");
      }

      toast.error("Error", {
        description: "Something went wrong. Please try again later.",
        style: {
          background: "red",
        },
      });
    } catch (error: unknown) {
      toast.error("Error", {
        description: "An error occurred while borrowing the book.",
        style: {
          background: "red",
        },
      });
    } finally {
      setBorrowing(false);
    }
  };

  const isBtnDisabled = !borrowingEligibility?.isEligible || borrowing;

  return (
    <Tooltip>
      <TooltipTrigger className="size-fit" asChild>
        <div>
          <Button
            className={`book-overview_btn ${
              borrowingEligibility?.isEligible
                ? "cursor-pointer"
                : "cursor-not-allowed"
            } hover:scale-105 transition-transform duration-300`}
            onClick={handleBookBorrowing}
            disabled={isBtnDisabled}
          >
            <Image
              src="/icons/book.svg"
              alt="book"
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
            <p className="font-bebas-neue text-xl text-dark-100">
              {borrowing ? "Borrowing ..." : "Borrow Book Request"}
            </p>
          </Button>
        </div>
      </TooltipTrigger>

      {isBtnDisabled && (
        <TooltipContent className="flex items-center gap-x-2 bg-slate-800 rounded-lg">
          <Info height={18} width={18} />
          <p className="text-xs">
            You aren't yet allowed <br /> to borrow books!
          </p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default BorrowBook;
