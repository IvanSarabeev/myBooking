import { FC } from "react";
import Link from "next/link";
import { cn, getNameInitials } from "@/lib/utils";
import Image from "next/image";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NavigationMenu from "@/components/NavigationMenu";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {
  sessionDetails: Session;
};

const Header: FC<Props> = ({ sessionDetails }) => {
  /**
   * This is an asynchronous function that handles user logout operations.
   * It uses server-side functionality to securely sign the user out of their session.
   *
   * @returns {Promise<void>} A promise that resolves once the user has been successfully logged out.
   */
  const handleLogout = async (): Promise<void> => {
    "use server";

    return await signOut();
  };

  const userName = sessionDetails.user?.name || "";

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

      <ul className="flex flex-row items-center gap-6">
        <NavigationMenu />

        <li>
          <Link
            href="/profile"
            className="flex items-center gap-2"
            aria-label="user profile link"
          >
            <Avatar className="transition-all hover:scale-105">
              <AvatarFallback className="text-dark-700 bg-amber-100 hover:bg-amber-50">
                {getNameInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <p className="text-light-100">
              {userName.includes(" ") ? userName?.split(" ")[0] : userName}
            </p>
          </Link>
        </li>

        <li>
          <form action={handleLogout}>
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className={cn(
                "hover:bg-transparent fill-none outline-none hover:scale-110 transform duration-300 cursor-pointer",
              )}
            >
              <Image
                src="/icons/logout.svg"
                alt="logout icon"
                height={24}
                width={24}
                decoding="async"
                loading="lazy"
              />
              <span className="sr-only">Logout Button</span>
            </Button>
          </form>
        </li>
      </ul>
    </header>
  );
};
export default Header;
