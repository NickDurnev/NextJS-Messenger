"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../../../hooks/use-dimensions";
import MenuToggle from "./MenuToggle";
import UserList from "./UserList";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

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
            <motion.div className="background" variants={sidebar} />
            <UserList />
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};

export default UserMenu;