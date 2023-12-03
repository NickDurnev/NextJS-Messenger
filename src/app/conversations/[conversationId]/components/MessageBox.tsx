"use client";

import { FC, useState, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { formatRelative } from "date-fns";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";
import MessageMenu from "./MessageMenu/MessageMenu";
import useTheme from "@/app/hooks/useTheme";

interface MessageBoxProps {
  data: FullMessageType;
  currentDate: Date;
}

const MessageBox: FC<MessageBoxProps> = ({ data, currentDate }) => {
  const session = useSession();
  const { theme } = useTheme();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [messageMenuOpen, setMessageMenuOpen] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

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
    isOwn
      ? "bg-skin-additional text-skin-base"
      : "bg-skin-bg-accent text-skin-base",
    data.image ? "rounded-md p-0 bg-transparent" : "rounded-2xl py-2 px-3"
  );

  const showMessageMenu = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const touchduration = 500;
    if (e.type === "touchstart") {
      setTimeout(() => {
        setMessageMenuOpen(true);
      }, touchduration);
      return;
    }
    setMessageMenuOpen(true);
  };

  return (
    <>
      <div className={container} ref={messageRef}>
        <div className={avatar}>
          <Avatar user={data.sender} />
        </div>
        <div className={body}>
          <div className="text-sm text-skin-additional">{data.sender.name}</div>
          <div className={message}>
            <ImageModal
              src={data.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
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
              <div
                className="relative"
                onContextMenu={showMessageMenu}
                onTouchStart={showMessageMenu}
              >
                <div>{data.body}</div>
                <div className="flex justify-end items-end mt-1 gap-2">
                  <div className="italic ml-auto text-xs text-skin-additional first-letter:capitalize">
                    {formatRelative(new Date(data.createdAt), currentDate)}
                  </div>
                  {isOwn && seenList.length > 0 && (
                    <div className="text-skin-mutated">
                      <IoCheckmarkDone />
                    </div>
                  )}
                  {isOwn && seenList.length === 0 && (
                    <div className="text-skin-additional pb-0.5">
                      <IoCheckmark />
                    </div>
                  )}
                  <MessageMenu
                    isOpen={messageMenuOpen}
                    theme={theme}
                    messageRef={messageRef}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {messageMenuOpen && (
        <div
          className="absolute top-0 left-0 z-40 w-full h-full bg-transparent"
          onClick={() => setMessageMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MessageBox;
