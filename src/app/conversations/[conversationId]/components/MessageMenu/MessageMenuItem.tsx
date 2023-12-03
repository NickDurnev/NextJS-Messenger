import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  icon: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const MessageMenuItem: FC<ButtonProps> = ({
  icon,
  children,
  onClick,
  danger,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={clsx(
        danger
          ? "text-skin-danger hover:text-skin-danger-hover"
          : "text-skin-additional hover:text-skin-additional-hover",
        "py-1 border-b border-skin-border flex items-center justify-center gap-1 text-[16px] cursor-pointer hover:opacity-75 transition bg-transparent"
      )}
    >
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: isHovered ? [30, 0, -30, 0] : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>
      {children}
    </motion.li>
  );
};

export default MessageMenuItem;
