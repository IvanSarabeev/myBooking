import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BooksListSkeletonProps = {
  containerClassName?: string;
  length?: number;
};

const MINIMUM_BOOKS_LENGTH = 6;

const BooksListSkeleton: FC<BooksListSkeletonProps> = ({
  containerClassName,
  length = MINIMUM_BOOKS_LENGTH,
}) => {
  return (
    <div
      className={cn(
        containerClassName,
        "mt-12 p-8 text-white bg-[#0d1117] h-fit rounded-lg",
      )}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {Array.from({ length: MINIMUM_BOOKS_LENGTH }).map((_, i) => (
          <Card
            key={i}
            className="bg-[#161b22] border-none rounded-2xl shadow-sm"
          >
            <CardContent className="p-4 flex flex-col items-start justify-center">
              <Skeleton className="w-full h-52 rounded-xl mb-4 bg-[#1c1f26]" />
              <Skeleton className="h-5 w-32 mb-2 bg-[#1c1f26]" />
              <Skeleton className="h-4 w-24 mt-2 bg-[#1c1f26]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BooksListSkeleton;
