import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const ProtectedRoute = async () => {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("api/auth/signin")
    }
    return (
        <h2>Protected route</h2>
    )
}

export default ProtectedRoute;