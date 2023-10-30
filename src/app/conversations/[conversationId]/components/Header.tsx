"use client";

import { FC, useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import Avatar from "@/app/components/Avatar";

interface HeaderProps {
    conversation: Conversation & { users: User[] };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return "Active";
    }, [conversation]);
    return (
        <div className="bg-skin-main w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between shadow-sm">
            <div className="flex gap-3 items-center">
                <Link
                    href="/conversations"
                    className="lg:hidden block text-skin-mutated hover:text-skin-mutated-hover transition cursor-pointer"
                >
                    <HiChevronLeft />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div>{conversation.name || otherUser.name}</div>
                    <div className="text-sm font-light text-skin-additional">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal size={32} onClick={() => { }} className="text-skin-mutated hover:text-skin-mutated-hover transition cursor-pointer" />
        </div>
    );
};

export default Header;
