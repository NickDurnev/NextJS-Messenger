"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";

import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems, users }) => {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    return (
        <>
            <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <aside
                className={clsx(
                    `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-skin-main`,
                    isOpen ? "hidden" : "block w-full left-0"
                )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-skin-base">Messages</div>
                        <div onClick={() => setIsModalOpen(true)} className="rounded-full p-2 text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover transition cursor-pointer">
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
                    ))}
                </div>
            </aside>
        </>
    );
};

export default ConversationList;
