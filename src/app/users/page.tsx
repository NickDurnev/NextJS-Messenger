import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import EmptyState from "../components/EmptyState";
import ThemeSwitcher from "../components/ThemeSwitcher";

const ProtectedRoute = async () => {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/auth");
    }
    return (
        <div className="hidden lg:block lg:pl-80 h-screen">
            {/* <ThemeSwitcher /> */}
            <EmptyState />
        </div>
    );
};

export default ProtectedRoute;
