import { useEffect, useMemo, useState } from "react";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";

const useConversationInfo = (data: FullConversationType) => {
  const session = useSession();
  const [newMessagesCount, setNewMessagesCount] = useState<number>(0);
  const { messages, isGroup } = data;

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!messages || !userEmail) {
      return;
    }
    if (
      messages.length === 1 &&
      messages[messages.length - 1].seen.length === 1
    ) {
      setNewMessagesCount((prevCount) => prevCount + 1);
      return;
    }
    const notSeenMessages = messages.filter(
      ({ seen }) => seen.length === 1 && seen[0].email !== userEmail
    );
    setNewMessagesCount(notSeenMessages.length);
  }, [messages, userEmail]);

  const lastMessage = useMemo(() => {
    if (!messages?.length) {
      return null;
    }

    return messages[messages.length - 1];
  }, [messages]);

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

  console.log("lastMessage", lastMessage);

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
    newMessagesCount,
    lastMessage,
    isOwn,
    lastMessageText,
    isGroup,
  };
};

export default useConversationInfo;
