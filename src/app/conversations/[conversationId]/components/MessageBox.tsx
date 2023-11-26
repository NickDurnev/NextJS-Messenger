"use client";

import { FC, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { formatRelative } from "date-fns";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(",");

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

    const avatar = clsx(isOwn && "order-2");

    const body = clsx("flex flex-col gap-2", isOwn && "items-end");

    const message = clsx(
        "max-w-[200px] xs:max-w-[70vw] lg:max-w-[50vw] text-sm break-words",
        isOwn ? "bg-skin-additional text-skin-base" : "bg-skin-accent text-skin-base",
        data.image ? "rounded-md p-0 bg-transparent" : "rounded-2xl py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-skin-additional">{data.sender.name}</div>
                    <div className="text-xs text-skin-additional">
                        {formatRelative(new Date(data.createdAt), new Date())}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                    {data.image ? (
                        <Image
                            onClick={() => setImageModalOpen(true)}
                            alt="Image"
                            height="288"
                            width="288"
                            src={data.image}
                            className="object-hover cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
            </div>
            {isLast && isOwn && seenList.length > 0 && (
                <div className="text-xs font-light text-skin-additional">{`Seen by ${seenList}`}</div>
            )}
        </div>
    );
};

export default MessageBox;
