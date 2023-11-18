"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const MobileItem: FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };
    return (
        <motion.li whileTap={{ scale: 0.8 }}>
            <Link
                onClick={handleClick}
                href={href}
                className={clsx(
                    `group flex gap-x-3 text-sm leading-6 font-semibold w-full rounded-full justify-center p-4 text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover`,
                    active && "bg-skin-active"
                )}
            >
                <Icon className={clsx("h-6 w-6", active && "text-skin-active")} />
            </Link>
        </motion.li>
    );
};

export default MobileItem;
