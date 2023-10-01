"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  return (
    <ActionTooltip label={name} side="right" align="center">
      <div> server</div>
    </ActionTooltip>
  );
};
