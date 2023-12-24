"use client";

import { FC, KeyboardEvent, useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FullMessageType } from "@/app/types";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: () => void;
  selectedMessage: FullMessageType | null;
}

const MessageInput: FC<MessageInputProps> = ({
  placeholder,
  id,
  required,
  register,
  handleSubmit,
  selectedMessage,
}) => {
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const textarea = document.querySelector(`#${id}`) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.focus();
    }
  }, [id, selectedMessage])


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
        autoFocus
        className="h-fit text-skin-base font-light py-2 px-4 bg-skin-additional w-full rounded-xl focus:outline-none resize-none"
      />
    </div>
  );
};

export default MessageInput;
