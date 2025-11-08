import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { accountRequestTableColumns } from "@/constants";
import dayjs from "dayjs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";
import UserActions from "@/components/admin/account-request/UserActions";
import Image from "next/image";

type AccountRequestsTableProps = {
  users: AccountRequestUser[];
};

const AccountRequestTable: FC<AccountRequestsTableProps> = ({ users }) => {
  return (
    <Table className="rounded-lg overflow-hidden">
      <TableHeader className="text-sm font-medium bg-[#F8F8FF]">
        <TableRow className="border-b border-[#EDF1F1]">
          {accountRequestTableColumns.map((item) => (
            <TableHead
              key={item.id}
              className={`${item.style} text-sm text-[#3A354E] font-normal leading-5 tracking-tight py-3 px-2.5`}
            >
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id} className="border-b border-[#F8F8FF]">
            <TableCell className="flex items-center gap-x-2.5 py-4 px-2.5">
              <Avatar>
                <AvatarFallback className="bg-primary-admin text-light-100">
                  {getNameInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </TableCell>

            <TableCell>{dayjs(user.createdAt).format("MMM D, YYYY")}</TableCell>
            <TableCell>{user.universityId}</TableCell>
            <TableCell>
              <span className="size-fit flex items-center justify-start gap-x-1.5 cursor-pointer transform hover:scale-105 duration-300">
                <Image
                  src="/icons/admin/eye.svg"
                  alt="eye"
                  height={16}
                  width={16}
                  style={{
                    filter:
                      "invert(48%) sepia(94%) saturate(4917%) hue-rotate(194deg) brightness(106%) contrast(102%)",
                  }}
                  className="text-[#0089F1]"
                />
                <p className="font-medium text-sm leading-5 tracking-tight text-[#0089F1]">
                  View ID Card
                </p>
              </span>
            </TableCell>

            <UserActions userId={user.id} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountRequestTable;
