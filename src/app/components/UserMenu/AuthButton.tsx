import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
    const { data: session } = useSession();

    console.log(session);

    if (session) {
        return (
            <>
                {session?.user?.name} <br />
                <button className="auth-btn" onClick={() => signOut()}>
                    Sign out
                    <div className="arrow-wrapper" >
                        <div className="arrow"></div>
                    </div>
                </button>
            </>
        )
    }
    return (
        <>
            <button className="auth-btn" onClick={() => signIn()}>
                Sign up
                <div className="arrow-wrapper" >
                    <div className="arrow"></div>
                </div>
            </button>
        </>
    )
}

export default AuthButton;