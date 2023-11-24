"use client";
import clsx from "clsx";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
    return (
        <div>
            <label
                className="block test-sm font-medium leading-6 text-skin-additional"
                htmlFor={id}
            >
                {label}
                <div className="mt-2">
                    <input
                        id={id}
                        type={type}
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
                </div>
                {errors[id] && (
                    <p className="mt-1 text-rose-500 text-sm">{`${errors[id]?.message}`}</p>
                )}
            </label>
        </div>
    );
};

export default Input;
