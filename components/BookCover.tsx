"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/env.config";

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

type BookCoverProps = {
  variant?: BookCoverVariant;
  className?: string;
  coverColor?: string;
  coverImage?: string;
};

const {
  env: { imageKit },
} = config;

const ImageKitUrl = imageKit?.urlEndpoint;

const BookCover: FC<BookCoverProps> = ({
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
        {ImageKitUrl !== undefined ? (
          <IKImage
            path={coverImage}
            urlEndpoint={imageKit.urlEndpoint}
            loading="lazy"
            lqip={{ active: true }}
            alt="book cover"
            fill
            className="rounded-sm object-fill"
          />
        ) : (
          <Image
            src={coverImage}
            alt="book cover"
            fill
            priority
            width={200}
            height={280}
            loading="lazy"
            decoding="async"
            className="rounded-sm object-fill"
          />
        )}
      </div>
    </div>
  );
};
export default BookCover;
