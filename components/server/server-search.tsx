"use client";
import { Crown, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionTooltip } from "../action-tooltip";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon?: React.ReactNode;
          name: string;
          id: string;
          role?: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/conversation/${id}`);
    }

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full px-2 py-2 transition rounded-md group gap-x-2 hover:bg-zinc-700/50"
      >
        <div className="flex items-center gap-1">
          <Search className="w-4 h-4 mr-2" />
          <p className="text-sm font-semibold transition">Search</p>
        </div>
        <kbd className="px-1.5 pointer-events-none select-none bg-zinc-700 rounded-lg text-sm opacity-60">
          <span className="mr-1 text-xs ">CTRL</span>j
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search all channels and members"
          className="px-2 py-1 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <CommandList className="my-2">
          <CommandEmpty>No Result found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, name, icon, role }) => {
                  return (
                    <CommandItem
                      onSelect={() => onClick({ id, type })}
                      key={id}
                      className="flex items-center hover:bg-[#232121] cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          {icon} <span>{name}</span>
                        </div>

                        <div className="">
                          {role === "ADMIN" && (
                            <ActionTooltip label="Admin" side="left">
                              <Crown className="w-4 h-4 text-yellow-500" />
                            </ActionTooltip>
                          )}
                          {role === "MODERATOR" && ( 
                            <ActionTooltip label="Moderator" side="left">
                              <Crown className="w-4 h-4 text-blue-500" />
                            </ActionTooltip>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ServerSearch;
