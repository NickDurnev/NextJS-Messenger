import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import AuthButton from "./AuthButton/AuthButton";
import styles from "./styles.module.css";

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

const itemStyles = "mb-5 flex items-center justify-center cursor-pointer";

const UserList = () => {
  const { data: session } = useSession();
  return (
    <motion.ul variants={listVariants} className="p-6 absolute top-24 z-10 w-80">
      {session?.user?.name && (
        <motion.li
          variants={itemVariants}
          className="mb-10 flex items-center justify-center"
        >
          <p className="text-xl font-bold text-white">{session.user.name}</p>
        </motion.li>
      )}
      {session?.user && (
        <motion.li
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={itemStyles}
        >
          <Link className={styles.btn} href="/users">
            Go to app
            <div className={styles.arrow_Wrapper}>
              <div className={styles.arrow}></div>
            </div>
          </Link>
        </motion.li>
      )}
      <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={itemStyles}
      >
        <AuthButton session={session} />
      </motion.li>
    </motion.ul>
  );
};

export default UserList;
