"use client";

import { FC, useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

import { FullMessageType } from "@/app/types";
import { fadeVariant } from "@/helpers/framerVariants";
import { formatToRelative } from "@/app/libs/date-fns";
import ImageModal from "./ImageModal";
import MessageMenu from "./MessageMenu/MessageMenu";

interface MessageBoxProps {
  data: FullMessageType;
  currentDate: Date;
  currentUserEmail?: string | null;
  isGroup: boolean | null;
  isLast: boolean;
  theme: string;
}

const MessageBox: FC<MessageBoxProps> = ({
  data,
  currentDate,
  currentUserEmail,
  isGroup,
  isLast,
  theme,
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [messageMenuOpen, setMessageMenuOpen] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  const { id, seen, sender, image, body, createdAt, editedAt } = data;

  const isOwn = currentUserEmail === sender?.email;

  const seenList = (seen || [])
    .filter((user) => user.email !== sender?.email)
    .map((user) => user.name)
    .join(",");

  const showMessageMenu = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const touchDuration = 500;
    if (e.type === "touchstart") {
      setTimeout(() => {
        setMessageMenuOpen(true);
      }, touchDuration);
      return;
    }
    setMessageMenuOpen(true);
  };

  const containerStyles = clsx(
    "relative flex gap-3 py-4 px-6",
    isOwn && "justify-end"
  );

  const bodyStyles = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageStyles = clsx(
    "max-w-[200px] xs:max-w-[70vw] lg:max-w-[50vw] text-sm break-words",
    isOwn
      ? "bg-skin-additional text-skin-base"
      : "bg-skin-bg-accent text-skin-base",
    image
      ? "rounded-md p-0 bg-transparent"
      : "rounded-tl-2xl rounded-tr-2xl py-2 px-3",
    isOwn ? "rounded-bl-2xl" : "rounded-br-2xl"
  );

  return (
    <>
      <motion.div
        className={containerStyles}
        ref={messageRef}
        key={id}
        variants={fadeVariant}
        initial={"initial"}
        animate={"open"}
        exit={"exit"}
      >
        <div
          className={bodyStyles}
          onContextMenu={showMessageMenu}
          onTouchStart={showMessageMenu}
        >
          <div className="text-sm text-skin-additional">
            {isGroup && sender?.name}
          </div>
          <div className={messageStyles}>
            <ImageModal
              src={image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            {image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                height="288"
                width="288"
                src={image}
                className="object-hover cursor-pointer hover:scale-110 transition translate"
              />
            ) : (
              <div className="relative">
                <div>{body}</div>
                <div className="flex justify-end items-end mt-1 gap-2">
                  <div className="italic ml-auto text-xs text-skin-additional">
                    {`${editedAt ? "edited " : ""}${formatToRelative(
                      new Date(createdAt),
                      currentDate
                    )}`}
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
                    data={data}
                    isOpen={messageMenuOpen}
                    isOwn={isOwn}
                    isLast={isLast}
                    onClose={() => setMessageMenuOpen(false)}
                    theme={theme}
                    messageRef={messageRef}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
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
