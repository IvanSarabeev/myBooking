import React, { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";

type BookCoverVariant =
  | "extraSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide"
  | "default";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular ",
  wide: "book-cover_wide",
  default: "book-cover",
};

type Props = {
  variant?: BookCoverVariant;
  className?: string;
  coverColor?: string;
  coverImage?: string;
};

const BookCover: FC<Props> = ({
  variant = "regular",
  className,
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="book cover "
          fill
          priority
          className="rounded-sm object-fill"
          color={coverColor}
        />
      </div>
    </div>
  );
};
export default BookCover;
