"use client";

import { FC } from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getNameInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

type SidebarProps = {
  session?: Session;
};

const Sidebar: FC<SidebarProps> = ({ session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
            loading="lazy"
            decoding="async"
          />
          <h1>myBooking</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks?.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm",
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user items-center">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getNameInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-light-500 text-xs truncate">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
