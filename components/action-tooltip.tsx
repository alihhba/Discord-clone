"use client";

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  label: String;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
}: ActionTooltipProps) => {
  return (
    <div className="z-50">
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p className="text-sm font-semibold capitalize">
              {label.toLocaleLowerCase()}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
