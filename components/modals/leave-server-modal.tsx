"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "leaveServer";

  const onLeave = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${data.server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-2xl text-center">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want leave server{" "}
            <span className="font-semibold text-blue-500">
              {data.server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full px-20 py-3">
            <Button disabled={isLoading} onClick={onClose} variant="default">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onLeave} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
