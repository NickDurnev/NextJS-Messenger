import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./AuthButton.module.css";

const AuthButton = () => {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <button className={styles.authBtn} onClick={() => signOut()}>
                Sign out
                <div className={styles.arrow_Wrapper}>
                    <div className={styles.arrow}></div>
                </div>
            </button>
        );
    }
    return (
        <Link className={styles.authBtn} href="/auth">
            Sign up
            <div className={styles.arrow_Wrapper}>
                <div className={styles.arrow}></div>
            </div>
        </Link>
    );
};

export default AuthButton;
