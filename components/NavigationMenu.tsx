"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavigationMenu: FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: "home", href: "/", title: "Home" },
    { id: "search", href: "/search", title: "Search" },
  ] as const;

  return menuItems.map((item) => {
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          className={cn(
            "text-base cursor-pointer capitalize",
            pathname === item.href ? "text-light-200" : "text-light-100",
          )}
        >
          {item.title}
        </Link>
      </li>
    );
  });
};

export default NavigationMenu;
