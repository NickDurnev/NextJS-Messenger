import DesktopSidebar from "./DesktopSidebar";
const Sidebar = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen">
            <DesktopSidebar />
            <main className="lg:pl-20 h-screen">{children}</main>
        </div>
    );
};

export default Sidebar;
