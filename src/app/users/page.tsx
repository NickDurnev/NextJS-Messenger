import EmptyState from "../components/EmptyState";

const Users = async () => {
    return (
        <div className="hidden lg:block lg:pl-80 h-screen">
            {/* <ThemeSwitcher /> */}
            <EmptyState />
        </div>
    );
};

export default Users;
