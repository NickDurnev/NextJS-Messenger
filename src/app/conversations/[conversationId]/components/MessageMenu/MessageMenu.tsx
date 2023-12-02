"use client";

import { FC, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { MdDeleteOutline } from "react-icons/md";
import MessageMenuItem from "./MessageMenuItem";

interface MessageMenuProps {
  isOpen?: boolean;
  onClose: () => void;
  theme: string;
}

const MessageMenu: FC<MessageMenuProps> = ({ isOpen, onClose, theme }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className={clsx(
            theme === "dark" ? "bg-[#3e3d3d]" : "bg-[#f7f7f7]",
            "absolute top-6 right-2 z-50 drop-shadow-md rounded-lg py-2 px-4 h-[200px]"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0}} 
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
