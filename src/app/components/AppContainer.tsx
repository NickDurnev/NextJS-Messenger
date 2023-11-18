"use client";

import { useEffect } from "react";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
    const [savedTheme, setSavedTheme] = useLocalStorage("theme");
    const { theme, set } = useTheme();

    useEffect(() => {
        savedTheme ? set(savedTheme) : setSavedTheme(theme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={clsx('h-screen w-screen bg-skin-main', theme === 'dark' ? 'theme-dark' : '')}>{children}</div>;
};

export default AppContainer;