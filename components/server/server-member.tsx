"use client";

import { Member, Profile, Server } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { Crown } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useRouter } from "next/navigation";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  };
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center justify-between w-full gap-2 p-2 my-1 text-base rounded-lg border-lg line-clamp-1 text-zinc-400 hover:bg-zinc-500/10 group"
    >
      <div className="flex items-center gap-2">
        <UserAvatar src={member.profile.imageUrl} className="w-7 h-7" />
        <p className="line-clamp-1">{member.profile.name}</p>
      </div>
      {member.role === "ADMIN" && (
        <ActionTooltip label="Admin">
          <Crown className="w-4 h-4 text-yellow-500" />
        </ActionTooltip>
      )}
      {member.role === "MODERATOR" && (
        <ActionTooltip label="Moderator">
          <Crown className="w-4 h-4 text-blue-500" />
        </ActionTooltip>
      )}
    </button>
  );
};

export default ServerMember;
