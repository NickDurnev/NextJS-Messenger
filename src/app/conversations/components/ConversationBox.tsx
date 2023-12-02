"use client";

import { FC, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatRelative } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConversetionSkeleton from "./ConversationSkeleton";

interface ConversationBoxProps {
    data: FullConversationType;
    currentDate: Date;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, currentDate }) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const isOwn = useMemo(() => {
        if (!lastMessage || !userEmail) {
            return false;
        }

        const seenArray = lastMessage.seen || [];
        const userID = seenArray.find(({ email }) => email === userEmail)?.id;

        if (!userID) {
            return false;
        }

        return userID === lastMessage.senderId
    }, [userEmail, lastMessage]);

    console.log('LAST MESSAGE', lastMessage);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return "Started a conversation";
    }, [lastMessage]);

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
                        <p className="text-md font-medium text-skin-base">
                            {data.name ?? otherUser?.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-skin-additional font-light">
                                {formatRelative(new Date(data.createdAt), currentDate)}
                            </p>
                        )}
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
                        {isOwn && lastMessage.seenIds.length > 1 && (
                            <div className="text-skin-mutated"><IoCheckmarkDone /></div>
                        )}
                        {isOwn && lastMessage.seenIds.length === 1 && (
                            <div className="text-skin-additional pb-0.5"><IoCheckmark /></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;
