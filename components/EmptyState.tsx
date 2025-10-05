import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EmptyState: FC = () => {
  return (
    <section className="not-found">
      <Image
        src="/images/no-books.png"
        alt="no results"
        height={200}
        width={200}
        loading="lazy"
        decoding="async"
      />
      <h4 className="tracking-tight text-light-100">No Results Found</h4>
      <p className="text-light-100 font-normal text-base text-justify leading-6">
        We couldn’t find any books matching your search. <br /> Try using
        different keywords or check for typos.
      </p>
      <Button className="not-found-btn">
        <Link
          href="/search"
          className="size-full outline-none border-none flex items-center justify-center"
        >
          CLEAR SEARCH
        </Link>
      </Button>
    </section>
  );
};

export default EmptyState;
