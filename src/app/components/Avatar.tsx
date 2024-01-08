import stringAvatar from "@/helpers/avatarFormatter";
import Image from "next/image";
import { PartialUser } from "@/app/types";
import useActiveList from "../hooks/useActiveList";

interface IProps {
  user?: PartialUser;
}

const Avatar = ({ user }: IProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  if (!user) {
    return "";
  }

  const { image, name } = user;
  return (
    <div className="relative">
      <div
        className="relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9
        md:h-11 
        md:w-11"
      >
        {image ? (
          <Image src={image} alt="Avatar" sizes="50%" fill />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-purple-500 text-gray-50 text-2xl border-0">
            {stringAvatar(name!)}
          </div>
        )}
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
