"use client";

import { FC } from "react";
import ReactSelect from "react-select";

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
    isMulti?: boolean;
}

const Select: FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
    isMulti = false
}) => {
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
                        menuPortal: (base) => ({ ...base, zIndex: 9999, textTransform: "capitalize" }),
                    }}
                    classNames={{ control: () => "text-sm" }}
                />
            </div>
        </div>
    );
};

export default Select;
