"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
    children: React.ReactNode;
    session: Session | null;
}

export default function AuthContext({ children }: AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
