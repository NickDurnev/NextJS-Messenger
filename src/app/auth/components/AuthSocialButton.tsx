import { FC } from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonprops {
    icon: IconType;
    onClick: () => void;
}

const AuthSocialButton: FC<AuthSocialButtonprops> = ({
    icon: Icon,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-skin-additional
        px-4 
        py-2 
        text-skin-base
        shadow-sm 
        ring-1 
        ring-inset 
        ring-skin-additional 
        hover:bg-skin-hover 
        focus:outline-offset-0
      "
        >
            <Icon />
        </button>
    );
};

export default AuthSocialButton;
