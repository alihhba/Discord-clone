"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

interface serverHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: serverHeaderProps) => {
  return <div> server header</div>;
};

export default ServerHeader;
