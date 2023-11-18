"use client";

import { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";

const ToasterContext = () => {
    const { theme } = useTheme();

    const baseStyles = {
        background: theme === "dark" ? "#4240402a" : "#ffffff",
        color: theme === "dark" ? "#c0b9b9" : "#262323",
    };

    return (
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        ...baseStyles,
                        border: "1px solid #299a23",
                    },
                },
                error: {
                    style: {
                        ...baseStyles,
                        border: "1px solid #971a0a",
                    },
                },
            }}
        />
    );
};

export default ToasterContext;
