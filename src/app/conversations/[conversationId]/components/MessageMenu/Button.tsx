import clsx from "clsx";
import { FC, ReactNode } from "react";

interface ButtonProps {
    icon: ReactNode;
    children?: ReactNode;
    onClick?: () => void;
    danger?: boolean;
}
const Button: FC<ButtonProps> = ({ icon, children, onClick, danger }) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                danger
                    ? "text-skin-danger hover:text-skin-danger-hover"
                    : "text-skin-additional hover:text-skin-additional-hover",
                "flex items-center justify-center gap-1 text-[16px] cursor-pointer hover:opacity-75 transition bg-transparent"
            )}
        >
            {icon}
            {children}
        </div>
    );
};

export default Button;
