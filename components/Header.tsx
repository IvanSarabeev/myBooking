"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getNameInitials } from "@/lib/utils";
import Image from "next/image";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  sessionDetails: Session;
};

const Header: FC<Props> = ({ sessionDetails }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={40}
          height={40}
          priority
        />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link
            href="/profile"
            className="flex items-center gap-2"
            aria-label="user profile link"
          >
            <Avatar className="transition-all hover:scale-105">
              <AvatarFallback className="text-dark-700 bg-amber-100 hover:bg-amber-50">
                {getNameInitials(sessionDetails?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <p className="text-light-100">{sessionDetails?.user?.name || ""}</p>
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
