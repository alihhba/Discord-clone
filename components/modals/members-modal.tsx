"use client";

import qs from "query-string";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";

// const roleIcon = {
//   GUEST: null,
//   MODERATOR: <ShieldCheck className="w-4 h-4" />,
//   ADMIN: <ShieldAlert className="w-4 h-4" />,
// };

const MemberModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const [loadingId, setLoadingId] = useState("");
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";

  const onChangeRole = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden text-black bg-white ">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-2xl text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-7 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center mb-6 gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex justify-between w-full gap-y-1">
                <div className="flex items-center w-full gap-x-6">
                  <div className="flex items-center text-xs font-semibold ">
                    {member.profile.name}
                  </div>

                  {member.role !== "GUEST" && (
                    <div className="flex items-center text-xs lowercase gap-x-1">
                      ({member.role})
                    </div>
                  )}
                </div>
                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="w-4 h-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center ">
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="space-y-2">
                                <DropdownMenuItem
                                  onClick={() =>
                                    onChangeRole(member.id, "GUEST")
                                  }
                                  className={`flex items-center justify-between px-1  ${
                                    member.role !== "GUEST" && "cursor-pointer"
                                  }`}
                                >
                                  Guest
                                  {member.role === "GUEST" && (
                                    <Check className="w-4 h-4 " />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onChangeRole(member.id, "MODERATOR")
                                  }
                                  className={`flex items-center justify-between px-1  ${
                                    member.role !== "MODERATOR" &&
                                    "cursor-pointer"
                                  }`}
                                >
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className="w-4 h-4 " />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator className="h-[1px] bg-zinc-300" />
                          <DropdownMenuItem
                            onClick={() => onKick(member.id)}
                            className="flex items-center justify-between w-full px-3 cursor-pointer"
                          >
                            kick <Gavel className="w-4 h-4" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="items-center w-4 h-4 ml-auto animate-spin text-zinc-500" />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;
