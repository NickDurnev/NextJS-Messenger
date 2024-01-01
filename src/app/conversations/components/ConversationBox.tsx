"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

import useOtherUser from "@/app/hooks/useOtherUser";
import useConversationInfo from "@/app/hooks/useConversationInfo";
import formatToRelative from "@/app/libs/date-fns";
import { FullConversationType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConversetionSkeleton from "./ConversationSkeleton";

interface ConversationBoxProps {
    data: FullConversationType;
    currentDate: Date;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, currentDate }) => {
    const otherUser = useOtherUser(data);
    const router = useRouter();
    const { newMessagesCount, lastMessage, isOwn, lastMessageText } =
        useConversationInfo(data);

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    if (!data.isGroup && !otherUser) {
        return <ConversetionSkeleton />;
    }

    return (
        <div
            onClick={handleClick}
            className="w-full relative flex items-center p-3 space-x-3 hover:scale-110 rounded-lg transition cursor-pointer"
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser!} />
            )}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-skin-base truncate">
                            {data.name ?? otherUser?.name}
                        </p>
                        <div className="max-w-[40%] px-1">
                            {lastMessage?.createdAt && (
                                <p className="text-xs text-skin-additional font-light">
                                    {formatToRelative(new Date(lastMessage.createdAt), currentDate)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-1">
                        <p
                            className={clsx(
                                `truncate text-sm`,
                                isOwn ? "text-skin-mutated" : "text-skin-base font-medium"
                            )}
                        >
                            {lastMessageText}
                        </p>
                        {isOwn && lastMessage && lastMessage.seenIds.length > 1 && (
                            <div className="text-skin-mutated">
                                <IoCheckmarkDone />
                            </div>
                        )}
                        {isOwn && lastMessage?.seenIds.length === 1 && (
                            <div className="text-skin-additional pb-0.5">
                                <IoCheckmark />
                            </div>
                        )}
                        {!isOwn && newMessagesCount > 0 && (
                            <div className="flex justify-center items-center w-6 h-6 p-2 rounded-full text-skin-base bg-skin-bg-accent">
                                {newMessagesCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;
