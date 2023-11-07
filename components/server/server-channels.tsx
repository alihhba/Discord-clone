"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

interface ServerChannelsProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4" />,
  [ChannelType.AUDIO]: <Mic className="w-4 h-4" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4" />,
};

const ServerChannels = ({ channel, server, role }: ServerChannelsProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { server, channel });
  };
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center justify-between w-full gap-2 p-2 my-1 text-base rounded-lg border-lg line-clamp-1 text-zinc-400 hover:bg-zinc-500/10 group"
    >
      <div className="flex items-center gap-2">
        {iconMap[channel.type]} {channel.name}
      </div>

      <div className="hidden group-hover:flex">
        {channel.name === "general" && role !== MemberRole.GUEST && (
          <Lock className="w-4 h-4" />
        )}
        {channel.name !== "general" && role !== MemberRole.GUEST && (
          <div className="flex items-center gap-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(e) => onAction(e, "editChannel")}
                className="w-4 h-4 transition text-zinc-500 hover:text-white"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(e) => onAction(e, "deleteChannel")}
                className="w-4 h-4 transition text-zinc-500 hover:text-white"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </button>
  );
};

export default ServerChannels;
