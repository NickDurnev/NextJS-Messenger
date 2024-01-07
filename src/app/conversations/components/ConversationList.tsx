"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { find } from "lodash";

import { FullConversationType, FullMessageType } from "@/app/types";
//#HOOKS and HELPERS
import useConversation from "@/app/hooks/useConversation";
import usePusherClient from "@/app/hooks/usePusherClient";
import { isLastMessage } from "@/helpers/dateCheckers";
//#COMPONENTS
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { pusherClient } = usePusherClient();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const currentDate = new Date();

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient?.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [
          ...current.filter(
            (currentConversation) => currentConversation.id !== conversation.id
          ),
        ];
      });

      if (conversation.id === conversationId) {
        router.push("/conversations");
      }
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === newMessage.conversationId) {
            console.log("NEW MESSAGE", newMessage);
            //TODO Test behavior
            const messages = currentConversation.messages;
            messages.pop();
            return {
              ...currentConversation,
              messages: [...messages, newMessage],
            };
          }

          return currentConversation;
        })
      );
    };

    const deleteMessageHandler = (deletedMessage: FullMessageType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === deletedMessage.conversationId) {
            const isLast = isLastMessage(
              deletedMessage.createdAt,
              currentConversation.lastMessageAt
            );
            console.log(isLast);
            if (!isLast) {
              return currentConversation;
            }

            const messages = currentConversation.messages;
            messages.pop();
            return {
              ...currentConversation,
              messages: [...messages],
            };
          }

          return currentConversation;
        })
      );
    };

    pusherClient?.bind("conversation:new", newHandler);
    pusherClient?.bind("conversation:update", updateHandler);
    pusherClient?.bind("conversation:deleteMessage", updateHandler);
    pusherClient?.bind("conversation:remove", removeHandler);
    pusherClient?.bind("message:update", updateMessageHandler);
    pusherClient?.bind("message:delete", deleteMessageHandler);

    return () => {
      pusherClient?.unsubscribe(pusherKey);
      pusherClient?.unbind("conversation:new", newHandler);
      pusherClient?.unbind("conversation:update", updateHandler);
      pusherClient?.unbind("conversation:deleteMessage", updateHandler);
      pusherClient?.unbind("conversation:remove", removeHandler);
      pusherClient?.unbind("message:update", updateMessageHandler);
      pusherClient?.unbind("message:delete", deleteMessageHandler);
    };
  }, [pusherKey, conversationId, router, pusherClient]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto bg-skin-main border-r border-skin-main`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-skin-base">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover hover:scale-125 transition cursor-pointer"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              currentDate={currentDate}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
