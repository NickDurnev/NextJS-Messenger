"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

interface MobileFooterProps {
    setIsModalOpen: (value: boolean) => void;
}

const MobileFooter = ({ setIsModalOpen }: MobileFooterProps) => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-skin-main border-t-[1px] lg:hidden">
            {routes.map(({ label, href, icon, active, onClick }) => (
                <MobileItem
                    key={label}
                    href={href}
                    icon={icon}
                    active={active}
                    onClick={onClick ? () => setIsModalOpen(true) : undefined}
                />
            ))}
        </div>
    );
};

export default MobileFooter;
