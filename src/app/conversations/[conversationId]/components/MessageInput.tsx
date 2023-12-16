"use client";

import { FC, KeyboardEvent, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    handleSubmit: () => void;
}

const MessageInput: FC<MessageInputProps> = ({
    placeholder,
    id,
    required,
    register,
    handleSubmit,
}) => {
    const [rows, setRows] = useState(1);
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
            return;
        }
        if (e.key === "Enter" && e.shiftKey && rows < 10) {
            setRows(rows + 1);
        }
        if (e.key === "Backspace" && rows > 1) {
            setRows(rows - 1);
        }
    };

    return (
        <div className="relative w-full">
            <textarea
                id={id}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                rows={rows}
                {...register(id, { required })}
                placeholder={placeholder}
                className="h-fit text-skin-base font-light py-2 px-4 bg-skin-additional w-full rounded-xl focus:outline-none resize-none"
            />
        </div>
    );
};

export default MessageInput;
