"use client";

import { FC, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import useAxiosAuth from "@/app/libs/hooks/useAxiosAuth";
import useMessage from "@/app/hooks/useMessage";
import MessageMenuItem from "./MessageMenuItem";
import { FullMessageType } from "@/app/types";
import { fadeVariant } from "@/helpers/framerVariants";

interface MessageMenuProps {
  data: FullMessageType;
  isOpen?: boolean;
  isOwn: boolean;
  isLast: boolean;
  onClose: () => void;
  theme: string;
  messageRef?: React.RefObject<HTMLDivElement>;
}

const MessageMenu: FC<MessageMenuProps> = ({
  data,
  isOpen,
  isOwn,
  isLast,
  onClose,
  theme,
  messageRef,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isUpLifted, setIsUpLifted] = useState(false);
  const { setSelectedMessage } = useMessage();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    // Adjust the menu position when it's opened
    if (isOpen && messageRef && messageRef.current && menuRef.current) {
      const messageRect = messageRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the menu overflows the bottom of the screen
      if (messageRect.bottom + menuRect.height > windowHeight * 0.8) {
        setIsUpLifted(true);
      }
    }
  }, [isOpen, messageRef]);

  const deleteMessage = () => {
    axiosAuth.delete(`/messages/${data.id}`);
    onClose();
  };

  const editMessage = () => {
    setSelectedMessage(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={menuRef}
          className={clsx(
            theme === "dark" ? "bg-[#3e3d3d]" : "bg-[#f7f7f7]",
            "absolute z-50 space-y-2 drop-shadow-md rounded-lg p-4",
            isUpLifted ? "-top-20" : "top-6",
            isOwn ? "right-2" : "left-2"
          )}
          variants={fadeVariant}
          initial={"initial"}
          animate={"open"}
          exit={"exit"}
        >
          {isOwn && isLast && (
            <MessageMenuItem icon={<CiEdit size={25} />} onClick={editMessage}>
              Edit
            </MessageMenuItem>
          )}
          <MessageMenuItem
            icon={<MdDeleteOutline size={25} />}
            danger
            onClick={deleteMessage}
          >
            Delete
          </MessageMenuItem>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default MessageMenu;
