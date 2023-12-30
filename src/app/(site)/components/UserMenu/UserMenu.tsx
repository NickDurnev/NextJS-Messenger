"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";

import useDimensions from "@/app/hooks/useDimensions";
import { userMenuSidebar } from "@/helpers/framerVariants";
import MenuToggle from "./MenuToggle";
import UserList from "./UserList";

const UserMenu = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className="absolute top-2.5 left-8 bottom-0 w-80"
        >
            <motion.div className="background" variants={userMenuSidebar} />
            <UserList />
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};

export default UserMenu;
