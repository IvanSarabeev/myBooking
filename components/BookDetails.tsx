import { FC } from "react";
import { cn } from "@/lib/utils";
import BookVideo from "@/components/BookVideo";

type BookDetailsProps = {
  summary: string;
  videoUrl: string;
  variant: "light" | "dark";
};

const BookDetails: FC<BookDetailsProps> = ({
  summary,
  videoUrl,
  variant = "light",
}) => {
  const textStyle = variant === "light" ? "text-light-100" : "text-dark-100";
  const containerStyle =
    variant === "light" ? "book-details" : "book-details-reverse";

  return (
    <section className={`${containerStyle} max-w-6xl`}>
      <div className="flex flex-col gap-7">
        <h3 className={`${textStyle} font-bold`}>Video</h3>

        {videoUrl.length > 0 && <BookVideo videoUrl={videoUrl} />}
      </div>

      <div className="flex flex-col gap-7">
        <h3 className={`${textStyle} font-bold`}>Summary</h3>

        {summary.length > 0 && (
          <div className={cn(textStyle, "space-y-5 text-lg")}>
            {summary?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
