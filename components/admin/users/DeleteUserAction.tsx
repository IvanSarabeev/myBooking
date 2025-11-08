"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DeleteUserModal from "@/components/admin/modals/DeleteUserModal";
import { deleteUser } from "@/lib/admin/actions/users";
import { toast } from "sonner";

type DeleteUserActionProps = {
  userId: string;
};

const DeleteUserAction: FC<DeleteUserActionProps> = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const { success, message } = await deleteUser(userId);

      if (success) {
        return toast.success("Success", {
          description: message,
          style: {
            backgroundColor: "green",
          },
        });
      }

      return toast.error("Unavailable", {
        description: message,
        style: {
          backgroundColor: "red",
        },
      });
    } catch (error: unknown) {
      toast.error("Error", {
        description: "Communication error. Please contact the support team",
        style: {
          backgroundColor: "red",
        },
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="transition duration-300 hover:scale-105 cursor-pointer"
      onClick={() => setOpenModal((prevState) => !prevState)}
    >
      <Image
        src="/icons/admin/trash.svg"
        alt="trash"
        height={16}
        width={16}
        loading="lazy"
        decoding="async"
      />

      {openModal && (
        <DeleteUserModal
          loading={isLoading}
          action={() => {
            handleUserDelete(userId).finally(() => {
              setOpenModal(false);
            });
          }}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Button>
  );
};
export default DeleteUserAction;
