"use client";

import { FC } from "react";
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
        <Link
            onClick={handleClick}
            href={href}
            className={clsx(
                `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover`,
                active && "bg-skin-active text-skin-active"
            )}
        >
            <Icon className="h-6 w-6" />
        </Link>
    );
};

export default MobileItem;
