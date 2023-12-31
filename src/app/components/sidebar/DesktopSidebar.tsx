"use client";

import { FC, useState } from "react";
import { redirect } from "next/navigation";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import Desktopitem from "./DesktopItem";
import Avatar from "../Avatar";
import ProfileSettingsModal from "./ProfileSettingsModal";

interface DesktopSidebarProps {
    currentUser: User;
    setIsModalOpen: (value: boolean) => void;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
    currentUser,
    setIsModalOpen,
}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    if (!currentUser) {
        redirect("/auth");
    }

    return (
        <>
            <ProfileSettingsModal
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-skin-main lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between border-skin-main">
                <nav className="mt-4 h-screen flex flex-col justify-between">
                    <ul className="flex flex-col items-center space-y-1">
                        {routes.map(({ label, href, icon, active, onClick }) => (
                            <Desktopitem
                                key={label}
                                href={href}
                                label={label}
                                icon={icon}
                                active={active}
                                onClick={onClick ? () => setIsModalOpen(true) : undefined}
                            />
                        ))}
                    </ul>
                    <nav className="mt-4 flex flex-col justify-between items-center">
                        <div
                            onClick={() => setIsOpen(true)}
                            className="cursor-pointer hover:opacity-75 transition"
                        >
                            <Avatar user={currentUser} />
                        </div>
                    </nav>
                </nav>
            </div>
        </>
    );
};

export default DesktopSidebar;
