"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "member";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="transition text-zinc-500 hover:text-white"
          >
            <Plus className="w-4 h-4 " />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "member" && (
        <ActionTooltip label="Manage Members">
          <button
            onClick={() => onOpen("members", { server })}
            className="transition text-zinc-500 hover:text-white"
          >
            <Settings className="w-4 h-4 " />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
