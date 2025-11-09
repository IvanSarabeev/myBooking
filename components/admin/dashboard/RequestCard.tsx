import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, getAvatarColor } from "@/lib/utils";

interface AccountRequest {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

interface BorrowRequest {
  id: string;
  bookId: string;
  borrowerId: string;
  borrowerName: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
}

// type T = AccountRequest | BorrowRequest;
type RequestTypeMap = {
  account: AccountRequest;
  borrow: BorrowRequest;
};

type RequestCardProps =
  | {
      type: "account";
      title: string;
      description: string;
      message: string;
      link: string;
      items?: AccountRequest[];
    }
  | {
      type: "borrow";
      title: string;
      description: string;
      message: string;
      link: string;
      items?: BorrowRequest[];
    };

const RequestCard: FC<RequestCardProps> = ({
  type,
  title,
  description,
  message,
  link,
  items,
}) => {
  const emptyImageType = type === "borrow";
  const hasAvailableItems = items && items.length > 0;

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

      {hasAvailableItems ? (
        type === "borrow" ? (
          <div className="flex flex-col"></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {items?.length &&
              items?.map((item, index) => {
                const bgColor = getAvatarColor(String(index));

                console.log("BG COLOR: ", bgColor);

                return (
                  <div
                    key={item.id}
                    className="max-w-[162px] min-h-[130px] flex flex-col items-center text-center border border-[#F8F8FF] rounded-lg py-3.5 px-3 gap-3 shadow-xs bg-[#F8F8FF]"
                  >
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={item.fullName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div
                        className={cn(
                          bgColor,
                          "size-12 rounded-full flex items-center justify-center  text-[#475569] font-semibold uppercase",
                        )}
                      >
                        {item.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}

                    <h6 className="text-base font-medium leading-6 tracking-tight text-[#1E293B]">
                      {item.fullName}
                    </h6>
                    <p className="w-full sm:max-w-none overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-5 tracking-tight text-[#64748B] truncate">
                      {item.email}
                    </p>
                  </div>
                );
              })}
          </div>
        )
      ) : (
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
      )}
    </div>
  );
};

export default RequestCard;
