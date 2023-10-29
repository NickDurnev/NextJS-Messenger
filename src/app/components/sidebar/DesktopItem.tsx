"use client";

import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemprops {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const Desktopitem: FC<DesktopItemprops> = ({
    label,
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
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(
                    `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-skin-mutated hover:text-skin-mutated-hover hover:bg-skin-hover transition`,
                    active && "bg-skin-active text-skin-active"
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
};

export default Desktopitem;
