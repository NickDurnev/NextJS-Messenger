"use client";
import { useState } from "react";
import { User } from "@prisma/client";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import AppSettingsModal from "./AppSettingsModal";
import ProfileSettingsModal from "./ProfileSettingsModal";

interface SidebarContainerProps {
    currentUser: User;
}

const SidebarContainer = ({ currentUser }: SidebarContainerProps) => {
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

    const openProfileSettings = () => {
        setIsAppModalOpen(false);
        setIsProfileSettingsOpen(true);
    }

    const closeProfileSettings = () => {
        setIsProfileSettingsOpen(false);
        setIsAppModalOpen(true);
    }

    return (
        <>
            <AppSettingsModal
                isOpen={isAppModalOpen}
                onClose={() => setIsAppModalOpen(false)}
                openProfileSettings={openProfileSettings}
            />
            <ProfileSettingsModal
                currentUser={currentUser}
                isOpen={isProfileSettingsOpen}
                onClose={closeProfileSettings}
            />
            <div>
                <DesktopSidebar
                    currentUser={currentUser}
                    setIsModalOpen={setIsAppModalOpen}
                />
                <MobileFooter setIsModalOpen={setIsAppModalOpen} />
            </div>
        </>
    );
};

export default SidebarContainer;
