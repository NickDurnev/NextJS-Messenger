"use client";
import clsx from "clsx";
import { FC, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { CiLock, CiUnlock } from "react-icons/ci";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
}) => {
    const [isShown, setIsShown] = useState(false);

    const setInputType = (type?: string) => {
        if (type !== "password") {
            return "text";
        }
        return isShown ? "text" : "password";
    };

    return (
        <div>
            <label
                className="relative block text-sm font-medium leading-6 text-skin-additional"
                htmlFor={id}
            >
                {label}
                <div className="mt-2">
                    <input
                        id={id}
                        type={setInputType(type)}
                        autoComplete="off"
                        disabled={disabled}
                        {...register(id, { required })}
                        className={clsx(
                            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-skin-additional 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-skin-additional
            placeholder:text-skin-additional
            bg-skin-main 
            focus:ring-2 
            focus:ring-inset 
            sm:text-sm 
            sm:leading-6`,
                            errors[id] ? "focus:ring-rose-500" : "focus:ring-sky-600",
                            disabled && "opacity-50 cursor-default"
                        )}
                    />{" "}
                    {(id === "password" || id === "cpassword") && (
                        <button
                            type="button"
                            onClick={() => setIsShown(!isShown)}
                            className="absolute right-3 top-[73%] -translate-y-1/2"
                        >
                            {isShown ? (
                                <CiUnlock
                                    className={clsx(
                                        "w-7 h-7",
                                        errors[id]
                                            ? "fill-rose-500 hover:fill-rose-600"
                                            : "fill-sky-500 hover:fill-sky-600"
                                    )}
                                />
                            ) : (
                                <CiLock
                                    className={clsx(
                                        "w-7 h-7",
                                        errors[id]
                                            ? "fill-rose-500 hover:fill-rose-600"
                                            : "fill-sky-500 hover:fill-sky-600"
                                    )}
                                />
                            )}
                        </button>
                    )}
                </div>
            </label>
            {errors[id] && (
                <p className="mt-1 text-rose-500 text-sm">{`${errors[id]?.message}`}</p>
            )}
        </div>
    );
};

export default Input;
