import stringAvatar from "@/services/avatarFormatter";
import Image from "next/image";
import { User } from "@prisma/client";

interface IProps {
    user?: User;
}

const Avatar = ({ user }: IProps) => {
    if (!user?.name) {
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
                    <Image src={image} alt="Avatar" fill />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-purple-500 text-gray-50 text-2xl border-0">
                        {stringAvatar(name)}
                    </div>
                )}
            </div>
            <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
        </div>
    );
};

export default Avatar;
