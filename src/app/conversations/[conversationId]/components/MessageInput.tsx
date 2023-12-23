"use client";

import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
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
  const [value, setValue] = useState("");
  const [rows, setRows] = useState(1);
  // const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!selectedMessage) {
      return;
    }
    setValue(selectedMessage.body ?? "");
    // if (textareaRef.current) {
    //     textareaRef.current.focus();
    // }
  }, [selectedMessage]);

  //TODO: FIX bugs with enter submit and emoji picker.

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      console.log(e.key);
      console.log(e.shiftKey);
      handleSubmit();
      e.preventDefault();
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // ref={textareaRef}
        className="h-fit text-skin-base font-light py-2 px-4 bg-skin-additional w-full rounded-xl focus:outline-none resize-none"
      />
    </div>
  );
};

export default MessageInput;
