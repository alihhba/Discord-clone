"use client";

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { type } from "os";

interface serverHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: serverHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between w-full h-12 px-3 font-semibold transition border-0 border-b-2 outline-none text-md hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 ">
          <button>{server.name}</button>
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 my-1  font-medium text-black dark:text-neutral-400 space-y-[2px] outline-none bg-zinc-800 p-1 rounded-lg">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server })}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900"
            >
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server })}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900"
            >
              Server Setting
              <Settings className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("members", { server })}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900"
            >
              Manage Members
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("createChannel")}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900"
            >
              Create Channel
              <PlusCircle className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuSeparator className="h-[1px] bg-zinc-950" />
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server })}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900 text-rose-600"
            >
              Delete Server
              <Trash className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server })}
              className="flex justify-between w-full px-3 py-2 text-sm rounded-lg outline-none cursor-pointer hover:bg-zinc-900 text-rose-600"
            >
              Leave Server
              <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerHeader;
