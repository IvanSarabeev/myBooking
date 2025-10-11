import { FC } from "react";
import { USER_STATUS_TYPES } from "@/constants";
import Image from "next/image";

type UserStatusLabelProps = {
  status: UserStatus["status"];
};

const { APPROVED, PENDING, REJECTED } = USER_STATUS_TYPES;

const UserStatusLabel: FC<UserStatusLabelProps> = ({ status }) => {
  let text, iconSrc;

  switch (status) {
    case APPROVED: {
      iconSrc = "/icons/verified.svg";
      text = "Verified Student";
      break;
    }
    case PENDING: {
      iconSrc = "/icons/admin/info.svg";
      text = "Under Review Student";
      break;
    }
    case REJECTED: {
      iconSrc = "/icons/warning.svg";
      text = "Rejected Student";
      break;
    }
    default: {
      return null;
    }
  }

  return (
    <p className="size-fit flex items-center justify-center gap-x-1.5 font-normal text-sm text-light-100 leading-5">
      <Image
        src={iconSrc}
        alt="icon"
        height={16}
        width={16}
        className="transition hover:scale-105 duration-300"
      />
      {text}
    </p>
  );
};

export default UserStatusLabel;
