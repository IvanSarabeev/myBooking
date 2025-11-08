"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AccountRequestModalProps = {
  type: "deny" | "approve";
  title: string;
  description: string;
  action: () => void;
  onClose: () => void;
};

const AccountRequestModal: FC<AccountRequestModalProps> = ({
  type,
  title,
  description,
  action,
  onClose,
}) => {
  const iconType =
    type === "deny" ? "/icons/admin/info.svg" : "/icons/admin/tick.svg";
  const iconOutline = type === "deny" ? "bg-red-400/10" : "bg-green-400/10";
  const iconColor = type === "deny" ? "confirm-reject" : "confirm-approve";

  const btnStyles = type === "deny" ? "bg-[#F46F70]" : "bg-[#4C7B62]";
  const btnText =
    type === "deny" ? "Deny & Notify Student" : "Approve & Send Confirmation";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="confirm-content">
        <DialogHeader>
          <div className={`confirm-illustration ${iconOutline}`}>
            <div className={cn(iconColor)}>
              <Image
                src={iconType}
                alt="notify"
                height={30}
                width={30}
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 5 text-center">
            <DialogTitle className="text-xl font-semibold tracking-normal text-dark-100">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base font-normal leading-6 text-[#64748B]">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="default"
            className={cn(
              btnStyles,
              "confirm-btn transition transform hover:scale-105 duration-300 hover:bg-primary-admin",
            )}
            onClick={action}
          >
            {btnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountRequestModal;
