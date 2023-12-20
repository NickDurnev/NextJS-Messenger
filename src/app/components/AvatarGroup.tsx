"use client";

import stringAvatar from "@/helpers/avatarFormatter";
import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface AvatarGroupProps {
    users?: User[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ users = [] }) => {
    const slicedUsers = users?.slice(0, 3);

    const positionMap = {
        0: "top-0 left-[12px]",
        1: "bottom-0",
        2: "bottom-0 right-0",
    };

    return (
        <div className="relative h-11 w-11">
            {slicedUsers.map((user, index) => (
                <div
                    key={user.id}
                    className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]
                        }`}
                >
                    {user?.image && <Image src={user.image} alt="Avatar" fill />}
                    {!user?.image && user.name && (
                        <div className="h-full w-full flex items-center justify-center bg-purple-500 text-gray-50 text-sm border-0">
                            {stringAvatar(user?.name)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AvatarGroup;
