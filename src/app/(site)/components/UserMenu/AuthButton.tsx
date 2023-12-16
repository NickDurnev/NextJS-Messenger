import { signOut, useSession } from "next-auth/react";
import Link from 'next/link'

const AuthButton = () => {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <button className="auth-btn" onClick={() => signOut()}>
                Sign out
                <div className="arrow-wrapper" >
                    <div className="arrow"></div>
                </div>
            </button>
        )
    }
    return (
        <Link className="auth-btn" href="/auth">Sign up
            <div className="arrow-wrapper" >
                <div className="arrow"></div>
            </div>
        </Link>
    )
}

export default AuthButton;