import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteUserModalProps = {
  loading: boolean;
  action: () => void;
  onClose: () => void;
};

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  loading,
  action,
  onClose,
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="confirm-content">
        <DialogHeader className="flex flex-col gap-y-2.5 text-center">
          <DialogTitle>Delete User Permanently</DialogTitle>
          <DialogDescription>
            Deleting this user permanently will notify the User that they're no
            longer available to use their account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={action}
            className="transition duration-300 hover:scale-105 cursor-pointer"
          >
            {loading ? "Sync..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
