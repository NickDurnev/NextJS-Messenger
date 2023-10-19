import * as React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import AuthButton from "./AuthButton";
import UserAvatar from "../UserAvatar";
import { IUser } from "@/helpers/interfaces";

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const UserList = () => {
  const { data: session } = useSession();

  return (
    <motion.ul variants={listVariants} className="p-6 absolute top-24 w-80">
      {session?.user?.name && (
        <motion.li
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mb-20 flex items-center justify-center cursor-pointer"
        >
          <UserAvatar
            image={session.user.image}
            name={session.user.name}
            size={100}
          />
        </motion.li>
      )}
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-5 flex items-center justify-center cursor-pointer"
      >
        <AuthButton />
      </motion.li>
    </motion.ul>
  );
};

export default UserList;