"use client";

import useTheme from "@/app/hooks/useTheme";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    errors?: FieldErrors;
    id?: string;
    onChange: (
        newValue:
            | MultiValue<Record<string, any>>
            | SingleValue<Record<string, any>>,
        actionMeta: ActionMeta<Record<string, any>>
    ) => void;
    options: Record<string, any>[];
    disabled?: boolean;
    isMulti?: boolean;
}

const Select: FC<SelectProps> = ({
    label,
    value,
    errors,
    id,
    onChange,
    options,
    disabled,
    isMulti = false,
}) => {
    const { theme } = useTheme();

    return (
        <div className="z-[100]">
            <label className="block text-sm font-medium leading-6 text-skin-additional">
                {label}
            </label>
            <div className="mt-2 capitalize">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti={isMulti}
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base: object) => ({
                            ...base,
                            zIndex: 9999,
                            textTransform: "capitalize",
                        }),
                        control: (base: object) => ({
                            ...base,
                            background: theme === "dark" ? "#2c2a2a" : "#ffffff",
                            borderColor: theme === "dark" ? "#605f5e" : "#1a191b",
                        }),
                        menuList: (base: object) => ({
                            ...base,
                            background: theme === "dark" ? "#2c2a2a" : "#ffffff",
                        }),
                        option: (base: object) => ({
                            ...base,
                            background: theme === "dark" ? "#2c2a2a" : "#ffffff",
                            color: theme === "dark" ? "#605f5e" : "#262323",
                            "&:hover": {
                                color: theme === "dark" ? "#d4d6dd" : "#a7a5a5",
                            },
                        }),
                        multiValueLabel: (base: object) => ({
                            ...base,
                            color: theme === "dark" ? "#605f5e" : "#262323",
                        }),
                        dropdownIndicator: (base: object) => ({
                            ...base,
                            color: theme === "dark" ? "#605f5e" : "#262323",
                            "&:hover": {
                                color: theme === "dark" ? "#d4d6dd" : "#a7a5a5",
                            },
                        }),
                        indicatorSeparator: (base: object) => ({
                            ...base,
                            backgroundColor: "var(--color-border-main)",
                        }),
                        group: (base: object) => ({
                            ...base,
                            color: theme === "dark" ? "#605f5e" : "#262323",
                        }),
                        singleValue: (base: object) => ({
                            ...base,
                            color: theme === "dark" ? "#605f5e" : "#262323",
                        }),
                    }}
                    classNames={{
                        control: () => "text-sm",
                    }}
                />
            </div>
            {errors && id && errors[id] && (
                <p className="mt-1 text-rose-500 text-sm">{`${errors[id]?.message}`}</p>
            )}
        </div>
    );
};

export default Select;
