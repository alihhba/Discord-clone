"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteChannel";

  const onLeave = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${data.channel?.id}`,
        query: {
          serverId: params?.serverId,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${params?.serverId}`);
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
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want Delete Channel{" "}
            <span className="font-semibold text-blue-500">
              #{data.channel?.name}
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

export default DeleteChannelModal;
