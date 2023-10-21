"use client";
import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div className="z-51">
      <ActionTooltip label="add a server" side="right" align="center">
        <button
          className="flex items-center group"
          onClick={() => onOpen("CreateServer")}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all justify-center bg-background items-center dark:bg-neutral-700 group-hover:bg-emerald-500 ">
            <Plus
              size={25}
              className="transition text-emerald-500 group-hover:text-white"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
