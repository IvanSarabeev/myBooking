import { FC } from "react";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type HeaderProps = {
  session?: Session;
};

const Header: FC<HeaderProps> = ({ session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 font-semibold text-2xl">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>

      <div className="relative size-full md:max-w-md">
        <span className="absolute top-1/3 left-4">
          <Search height={20} width={20} />
        </span>
        <Input
          name="search"
          type="text"
          className="size-full text-base px-6 sm:px-8 md:px-12"
          placeholder="Search users, books by title, author or genre."
        />
      </div>
    </header>
  );
};

export default Header;
