import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/SIdebar";
import UserList from "./components/UserList";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
    const users = await getUsers();
    return (
        <Sidebar>
            <div className="h-screen">
                <UserList items={users} />
                {children}</div>
        </Sidebar>
    );
};

export default UsersLayout;
