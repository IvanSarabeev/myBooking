"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { changeUserRole } from "@/lib/admin/actions/users";
import { toast } from "sonner";

type RoleBadgeProps = {
  userId: string;
  role: "ADMIN" | "USER" | null;
};

const RoleBadge: FC<RoleBadgeProps> = ({ userId, role }) => {
  if (!role) {
    return <Badge variant="secondary">Unknown</Badge>;
  }

  const badgeStyle =
    role === "USER"
      ? "text-[#C11574] bg-[#FDF2FA]"
      : "text-[#027A48] bg-[#ECFDF3]";

  const generalStyle =
    "normal-case text-sm font-semibold leading-5 text-center cursor-pointer transition duration-300 hover:scale-105";

  const handleRoleChange = async (role: "ADMIN" | "USER"): Promise<void> => {
    const newRole = role === "ADMIN" ? "USER" : "ADMIN";
    const { success, message } = await changeUserRole(userId, newRole);

    if (success) {
      toast.success("Success", {
        description: message,
        icon: null,
        position: "top-center",
        style: {
          backgroundColor: "green",
        },
      });
      return;
    }

    toast.error("Error", {
      description: message,
      icon: null,
      position: "top-center",
      style: {
        backgroundColor: "red",
      },
    });
  };

  return (
    <Badge
      variant="secondary"
      className={cn(badgeStyle, generalStyle)}
      onClick={() => handleRoleChange(role)}
    >
      {role}
    </Badge>
  );
};
export default RoleBadge;
