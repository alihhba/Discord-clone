import React from "react";
import MenuMobileTrigger from "../menu-mobileTrigger";
import { Hash, Mic, Video } from "lucide-react";
import { ChannelType } from "@prisma/client";
import { AvatarImage } from "../ui/avatar";
import UserAvatar from "../user-avatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  channelType?: ChannelType;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mt-0.5" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mt-0.5" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mt-0.5" />,
};

const ChatHeader = ({
  serverId,
  name,
  type,
  channelType,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="flex w-full h-12 border-b border-r-zinc-500 items-center gap-3">
      <MenuMobileTrigger serverId={serverId} />
      <div className="flex items-center gap-1">
        {channelType && type === "channel" && iconMap[channelType]}
        {type === "conversation" && <UserAvatar src={imageUrl} className="w-8 h-8 mr-2" />}
        <p className="font-semibold text-md text-black dark:text-white">
          {name}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
