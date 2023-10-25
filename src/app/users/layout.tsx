import Sidebar from "../components/sidebar/SIdebar";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <Sidebar>
            <div className="h-screen">{children}</div>
        </Sidebar>
    );
};

export default UsersLayout;
