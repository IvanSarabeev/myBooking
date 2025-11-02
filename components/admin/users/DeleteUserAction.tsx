"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DeleteUserModal from "@/components/admin/modals/DeleteUserModal";

type DeleteUserActionProps = {
  userId: string;
};

const DeleteUserAction: FC<DeleteUserActionProps> = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = (id: string) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        Promise.resolve();
        console.log("Delete User with ID: ", id);
      }, 5200);
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
            deleteUser(userId);
            setOpenModal(false);
          }}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Button>
  );
};
export default DeleteUserAction;
