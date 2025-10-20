"use client";

import { FC } from "react";
import { changeRequestedStatus } from "@/lib/admin/actions/users";
import { toast } from "sonner";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

type UserActionsProps = {
  userId: string;
};

const UserActions: FC<UserActionsProps> = ({ userId }) => {
  const handleStatusChange = async (status: "APPROVED" | "REJECTED") => {
    const { success, message } = await changeRequestedStatus(userId, status);

    if (success) {
      toast.success("Success", {
        description: message,
        style: {
          backgroundColor: "green",
        },
      });
      return;
    }

    toast.error("Error", {
      description: message,
      style: {
        backgroundColor: "red",
      },
    });
    return;
  };

  return (
    <TableCell className="flex items-center gap-x-5">
      <Button
        className="min-h-9 w-fit rounded-lg leading-5 font-semibold tracking-normal text-sm text-green-600 bg-[#ECFDF3] cursor-pointer hover:scale-105 transform duration-300 hover:bg-primary-admin hover:text-white"
        onClick={() => handleStatusChange("APPROVED")}
      >
        Approve Account
      </Button>
      <Button
        variant="outline"
        className="outline-none border-none cursor-pointer"
        onClick={() => handleStatusChange("REJECTED")}
      >
        <CircleX className="size-4 text-red-500" />
      </Button>
    </TableCell>
  );
};

export default UserActions;
