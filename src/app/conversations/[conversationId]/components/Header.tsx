"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
//#HOOKS AND HELPERS
import useActiveList from "@/app/hooks/useActiveList";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import usePusherClient from "@/app/hooks/usePusherClient";
import { formatToDistance } from "@/app/libs/date-fns";
//#COMPONENTS
import ProfileDrawer from "./ProfileDrawer";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userWasOnline, setUserWasOnline] = useState(
    formatToDistance(new Date(otherUser?.wasOnlineAt), new Date())
  );
  const { members } = useActiveList();
  const { pusherClient } = usePusherClient();
  const [conversationId, setConversationId] = useLocalStorage("conversationId");

  const isActive = members.indexOf(otherUser?.email) !== -1;

  useEffect(() => {
    setConversationId(conversation?.id);
    pusherClient?.subscribe(conversationId);

    const updateUserHandler = ({ wasOnlineAt }: { wasOnlineAt: Date }) => {
      setUserWasOnline(formatToDistance(new Date(wasOnlineAt), new Date()));
    };

    pusherClient?.bind("user:update", updateUserHandler);

    return () => {
      pusherClient?.unbind("user:update", updateUserHandler);
    };
  }, [conversation, conversationId, pusherClient, setConversationId]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : userWasOnline;
  }, [
    conversation.isGroup,
    conversation.users.length,
    isActive,
    userWasOnline,
  ]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-skin-main w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between shadow-sm border-skin-main">
        <div className="flex gap-3 items-center max-w-[90%]">
          <Link
            href="/conversations"
            className="lg:hidden block text-skin-mutated hover:text-skin-mutated-hover transition cursor-pointer"
          >
            <HiChevronLeft />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser!} />
          )}
          <div className="flex flex-col max-w-[50%] xs:max-w-[80%]">
            <div className="text-skin-base truncate md:text-clip">
              {conversation.name ?? otherUser?.name}
            </div>
            <div className="text-sm font-light text-skin-additional">
              {statusText}
            </div>
          </div>
        </div>
        <div
          onClick={() => setDrawerOpen(true)}
          className="rounded-full p-2 text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover hover:scale-110 transition cursor-pointer"
        >
          <HiEllipsisHorizontal
            size={32}
            className="text-skin-mutated hover:text-skin-mutated-hover transition cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
