"use client";
import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip label="add a server" side="right" align="center">
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all justify-center bg-background items-center dark:bg-neutral-700 group-hover:bg-emerald-500 ">
            <Plus
              size={25}
              className="text-emerald-500 group-hover:text-white transition"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
