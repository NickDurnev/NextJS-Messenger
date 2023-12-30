"use client";

import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { EmojiClickData, Theme } from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

//# HOOKS
import useTheme from "@/app/hooks/useTheme";
import useMessage from "@/app/hooks/useMessage";
import useAxiosAuth from "@/app/libs/hooks/useAxiosAuth";
import MessageInput from "../components/MessageInput";
import EmojiPicker from "./EmojiPicker";

const Form = () => {
  const { conversationId } = useConversation();
  const { selectedMessage, setSelectedMessage } = useMessage();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { theme } = useTheme();
  const axiosAuth = useAxiosAuth();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (!selectedMessage) {
      return;
    }
    setValue("message", selectedMessage.body, { shouldValidate: true });
  }, [selectedMessage, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    const trimmedMessage = data.message.trim();
    if (!trimmedMessage) {
      return;
    }
    if (selectedMessage) {
      axiosAuth.patch(`/messages/${selectedMessage.id}`, data);
      setSelectedMessage(null);
      return;
    }
    axiosAuth.post("/messages", { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axiosAuth.post("/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    const currentValue = getValues().message;
    const updatedValue = currentValue + emoji.emoji;
    setValue("message", updatedValue, { shouldValidate: true });
  };

  const handleEmojiBtnClick = () => {
    if (isEmojiPickerOpen) {
      return;
    }
    setIsEmojiPickerOpen(true);
  };

  return (
    <div className="h-fitrelative py-4 px-4 bg-skin-main border-t flex items-center gap-2 lg:gap-4 w-full border-skin-main">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="kqj1yrdh"
      >
        <HiPhoto size={30} className="text-skin-mutated" />
      </CldUploadButton>
      <button className="cursor-pointer" onClick={handleEmojiBtnClick}>
        <GrEmoji size={30} className="text-skin-mutated" />
      </button>
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        isOpen={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
        className="bottom-[525px] left-0 lg:left-[115%]"
      />
      <form
        onSubmit={(handleSubmit(onSubmit))}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          handleSubmit={(handleSubmit(onSubmit))}
          required
          placeholder="Write a message"
          selectedMessage={selectedMessage}
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-skin-bg-accent hover:bg-skin-bg-accent-hover transition cursor-pointer"
        >
          <HiPaperAirplane size={18} className="text-skin-button-text" />
        </button>
      </form>
    </div >
  );
};

export default Form;
