import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

type RequestCardProps = {
  type: "account" | "borrow";
  title: string;
  description: string;
  message: string;
  link: string;
};

const RequestCard: FC<RequestCardProps> = ({
  type,
  title,
  description,
  message,
  link,
}) => {
  const emptyImageType = type === "borrow";

  return (
    <div className="max-h-[380px] max-w-[620px] size-full flex flex-col gap-4 p-4 rounded-2xl border border-[#EDF1F1]  bg-white">
      <div className="h-fit w-full flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-normal leading-7 text-[#1E293B]">
          {title}
        </h4>

        <Link
          href={link}
          className="w-fit h-9 rounded-lg py-2 px-3 text-center text-[#25388C] text-sm font-semibold leading-5 tracking-normal cursor-pointer transition duration-300 hover:scale-105 bg-[#F8F8FF]"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-1.5">
        <div className="gap-y-2.5 flex flex-col items-center justify-center">
          <Image
            src={
              emptyImageType
                ? "/images/empty-book-requests.png"
                : "/images/empty-account-requests.png"
            }
            alt="empty content"
            height={144}
            width={193}
          />

          <h5 className="text-base font-semibold tracking-normal text-[#1E293B]">
            {description}
          </h5>
          <p className="text-base font-normal text-[#64748B] tracking-normal">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
