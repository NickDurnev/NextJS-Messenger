import { FC } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import styles from "../styles.module.css";

interface IProps {
    session: Session | null;
}

const AuthButton: FC<IProps> = ({ session }) => {

    if (session?.user) {
        return (
            <button className={styles.btn} onClick={() => signOut()}>
                Sign out
                <div className={styles.arrow_Wrapper}>
                    <div className={styles.arrow}></div>
                </div>
            </button>
        );
    }
    return (
        <Link className={styles.btn} href="/auth">
            Sign up
            <div className={styles.arrow_Wrapper}>
                <div className={styles.arrow}></div>
            </div>
        </Link>
    );
};

export default AuthButton;
