import { useMemo } from "react";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";

const useConversationInfo = (data: FullConversationType) => {
  const session = useSession();
  const { messages } = data;

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const lastMessage = useMemo(() => {
    const array = messages || [];

    return array[array.length - 1];
  }, [messages]);

  const newMessages = useMemo(
    () =>
      messages.filter(
        ({ seen }) => seen.length === 1 && seen[0].email !== userEmail
      ),
    [messages, userEmail]
  );

  const isOwn = useMemo(() => {
    if (!lastMessage || !userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    const userID = seenArray.find(({ email }) => email === userEmail)?.id;

    if (!userID) {
      return false;
    }

    return userID === lastMessage.senderId;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return {
    newMessages,
    lastMessage,
    isOwn,
    lastMessageText,
  };
};

export default useConversationInfo;
