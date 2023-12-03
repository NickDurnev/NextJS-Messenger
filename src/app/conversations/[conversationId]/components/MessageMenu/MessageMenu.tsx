"use client";

import { FC, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { MdDeleteOutline } from "react-icons/md";
import MessageMenuItem from "./MessageMenuItem";

interface MessageMenuProps {
  isOpen?: boolean;
  theme: string;
  messageRef?: React.RefObject<HTMLDivElement>;
}

const MessageMenu: FC<MessageMenuProps> = ({ isOpen, theme, messageRef }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isUpLifted, setIsUpLifted] = useState(false);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={menuRef}
          className={clsx(
            theme === "dark" ? "bg-[#3e3d3d]" : "bg-[#f7f7f7]",
            "absolute right-2 z-50 drop-shadow-md rounded-lg py-2 px-4 h-[200px]",
            isUpLifted ? "-top-32" : "top-6"
          )}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
        >
          <MessageMenuItem
            icon={<MdDeleteOutline size={25} />}
            danger
            onClick={() => console.log("DELETE")}
          >
            Delete
          </MessageMenuItem>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default MessageMenu;
