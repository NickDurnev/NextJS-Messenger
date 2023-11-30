"use client";
import { ReactNode, FC } from "react";
import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
                disabled && "opacity-50 cursor-default",
                fullWidth && "w-full",
                secondary ? "text-skin-additional" : "text-white",
                danger &&
                "bg-skin-danger hover:bg-skin-danger-hover focus-visible:outline-skin-danger-hover",
                !danger &&
                !secondary &&
                "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
            )}
        >
            {children}
        </button>
    );
};

export default Button;
