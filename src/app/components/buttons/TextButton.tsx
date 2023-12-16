import clsx from "clsx";
import { FC, ReactNode } from "react";

interface TextButtonProps {
    children: ReactNode;
    onClick: () => void;
    isMobileOnly?: boolean;
}

const TextButton: FC<TextButtonProps> = ({ children, onClick, isMobileOnly }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx("w-full text-left text-skin-base hover:text-skin-additional hover:border-skin-additional transition font-medium m-0 p-2 border-b border-skin-main cursor-pointer ", isMobileOnly && "lg:hidden")}
        >
            {children}
        </button>
    );
};

export default TextButton;
