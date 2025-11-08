"use client";

import { FC, useState } from "react";
import { changeRequestedStatus } from "@/lib/admin/actions/users";
import { toast } from "sonner";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import AccountRequestModal from "@/components/admin/modals/AccountRequestModal";

type UserActionsProps = {
  userId: string;
};

const UserActions: FC<UserActionsProps> = ({ userId }) => {
  const [modalType, setModalType] = useState<"deny" | "approve" | null>(null);

  /**
   * Handles the status change of a request, updating it to the specified status.
   *
   * @param {"APPROVED" | "REJECTED"} status - The new status to set for the request.
   * @returns {Promise<void>} - Resolves after the status change operation and notification display.
   */
  const handleStatusChange = async (
    status: "APPROVED" | "REJECTED",
  ): Promise<void> => {
    const { success, message } = await changeRequestedStatus(userId, status);

    if (success) {
      toast.success("Success", {
        description: message,
        style: {
          backgroundColor: "green",
        },
      });
    } else {
      toast.error("Error", {
        description: message,
        style: {
          backgroundColor: "red",
        },
      });
    }
  };

  const modalTitle =
    modalType === "deny" ? "Deny Account Request" : "Approve Account Request";
  const modalDescription =
    modalType === "deny"
      ? "Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
      : "Approve the student’s account request and grant access. A confirmation email will be sent upon approval.";

  return (
    <TableCell className="flex items-center gap-x-5">
      <Button
        className="min-h-9 w-fit rounded-lg leading-5 font-semibold tracking-normal text-sm text-green-600 bg-[#ECFDF3] cursor-pointer hover:scale-105 transform duration-300 hover:bg-primary-admin hover:text-white"
        onClick={() => setModalType("approve")}
      >
        Approve Account
      </Button>
      <Button
        variant="outline"
        className="outline-none border-none cursor-pointer"
        onClick={() => setModalType("deny")}
      >
        <CircleX className="size-4 text-red-500" />
      </Button>

      {modalType && (
        <AccountRequestModal
          type={modalType}
          title={modalTitle}
          description={modalDescription}
          action={() => {
            handleStatusChange(modalType === "deny" ? "REJECTED" : "APPROVED");
            setModalType(null);
          }}
          onClose={() => setModalType(null)}
        />
      )}
    </TableCell>
  );
};

export default UserActions;
