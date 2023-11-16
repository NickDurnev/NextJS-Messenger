"use client";
import { useState } from "react";
import { User } from "@prisma/client";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import AppSettingsModal from "./AppSettingsModal";

interface SidebarContainerProps {
    currentUser: User;
}

const SidebarContainer = ({ currentUser }: SidebarContainerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(isModalOpen);

    return (
        <>
            <AppSettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div>
                <DesktopSidebar
                    currentUser={currentUser!}
                    setIsModalOpen={setIsModalOpen}
                />
                <MobileFooter setIsModalOpen={setIsModalOpen} />
            </div>
        </>
    );
};

export default SidebarContainer;
