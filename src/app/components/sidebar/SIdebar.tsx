import SidebarContainer from "./SIdebarContainer";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();
    return (
        <div className="h-screen">
            <SidebarContainer currentUser={currentUser!} />
            <main className="lg:pl-20 h-screen">{children}</main>
        </div>
    );
};

export default Sidebar;
