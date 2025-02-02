import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
