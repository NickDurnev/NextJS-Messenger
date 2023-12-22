"use client";

import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { find } from "lodash";
import { AnimatePresence } from "framer-motion";

import { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import usePusherClient from "@/app/hooks/usePusherClient";
import scrollTo from "@/helpers/scrollTo";
import { useSession } from "next-auth/react";

interface BodyProps {
  initialMessages: FullMessageType[];
  isGroup: boolean | null;
}

const Body: FC<BodyProps> = ({ initialMessages, isGroup }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  const session = useSession();
  const { pusherClient } = usePusherClient();
  const currentDate = new Date();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, []);

  useEffect(() => {
    pusherClient?.subscribe(conversationId);
    scrollTo(bottomRef);
    const messageHandler = (message: FullMessageType) => {
      const currentUserEmail = session.data?.user?.email;
      if (currentUserEmail !== message.sender.email) {
        axios.post(`/api/conversations/${conversationId}/seen`);
      }

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      scrollTo(bottomRef);
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );

      scrollTo(bottomRef);
    };

    const deleteMessageHandler = (deletedMessage: FullMessageType) => {
      setMessages((current) =>
        [...current].filter(({ id }) => id !== deletedMessage.id)
      );
    };

    pusherClient?.bind("messages:new", messageHandler);
    pusherClient?.bind("message:update", updateMessageHandler);
    pusherClient?.bind("message:delete", deleteMessageHandler);
    return () => {
      pusherClient?.unsubscribe(conversationId);
      pusherClient?.unbind("messages:new", messageHandler);
      pusherClient?.unbind("message:update", updateMessageHandler);
      pusherClient?.unbind("message:delete", deleteMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <AnimatePresence>
      <div className="flex-1 overflow-y-auto bg-skin-main">
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            data={message}
            currentDate={currentDate}
            isGroup={isGroup}
          />
        ))}
        <div ref={bottomRef} className="pt-4" />
      </div>
    </AnimatePresence>
  );
};

export default Body;
