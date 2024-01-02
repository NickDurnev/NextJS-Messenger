"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";
import { pusherClient as newPusherInstance } from "../libs/pusher";
import usePusherClient from "../hooks/usePusherClient";
import Loader from "./Loader";
import ActiveStatus from "./ActiveStatus";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
    const [savedTheme, setSavedTheme] = useLocalStorage("theme");
    const { theme, set } = useTheme();
    const { pusherClient, setPusherClient } = usePusherClient();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        savedTheme ? set(savedTheme) : setSavedTheme(theme);
        if (!pusherClient) {
            console.log('creating pusher client');
            setPusherClient(newPusherInstance);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div className="h-screen w-screen bg-gray-300"><Loader /></div>
            ;
    }

    return (
        <div
            className={clsx(
                "h-screen w-screen bg-skin-main",
                theme === "dark" ? "theme-dark" : ""
            )}
        >
            <ActiveStatus />
            {children}
        </div>
    );
};

export default AppContainer;
