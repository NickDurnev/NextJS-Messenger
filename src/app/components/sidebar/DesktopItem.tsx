"use client";

import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const Desktopitem: FC<DesktopItemProps> = ({
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
        <li>
            <Link
                onClick={handleClick}
                href={href}
                className={clsx(
                    `group flex gap-x-3 p-3 text-sm leading-6 font-semibold rounded-full text-skin-mutated hover:text-skin-mutated-hover hover:scale-75 hover:bg-skin-hover transition`,
                    active && "bg-skin-active"
                )}
            >
                <Icon className={clsx("h-6 w-6 shrink-0", active && "text-skin-active")} />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
};

export default Desktopitem;
