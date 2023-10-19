import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ThemeSwitcher from '../components/ThemeSwitcher';

const ProtectedRoute = async () => {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("api/auth/signin")
    }
    return (
        <>
            <h2>Protected route</h2>
            <ThemeSwitcher />
        </>
    )
}

export default ProtectedRoute;