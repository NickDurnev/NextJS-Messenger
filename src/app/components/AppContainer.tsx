"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
    const [savedTheme, setSavedTheme] = useLocalStorage("theme");
    const { theme, set } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        savedTheme ? set(savedTheme) : setSavedTheme(theme);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return "";
    }

    return (
        <div
            className={clsx(
                "h-screen w-screen bg-skin-main",
                theme === "dark" ? "theme-dark" : ""
            )}
        >
            {children}
        </div>
    );
};

export default AppContainer;
