"use client";

import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { EmojiClickData } from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "../components/MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import EmojiPicker from "./EmojiPicker";

const Form = () => {
  const { conversationId } = useConversation();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
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
    //TODO FIX OPEN-CLOSE
    console.log(isEmojiPickerOpen);
    isEmojiPickerOpen ? setIsEmojiPickerOpen(false) : setIsEmojiPickerOpen(true);
    console.log(isEmojiPickerOpen);
  }

  console.log(isEmojiPickerOpen);

  return (
    <div className="relative py-4 px-4 bg-skin-main border-t flex items-center gap-2 lg:gap-4 w-full border-skin-main">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="kqj1yrdh"
      >
        <HiPhoto size={30} className="text-skin-mutated" />
      </CldUploadButton>
      <button
        className="cursor-pointer"
        onClick={handleEmojiBtnClick}
      >
        <GrEmoji size={30} className="text-skin-mutated" />
      </button>
      <EmojiPicker onEmojiClick={handleEmojiClick} isOpen={isEmojiPickerOpen} onClose={() => setIsEmojiPickerOpen(false)} className="absolute bottom-[520px] sm:bottom-[600px] left-0 lg:left-[100%]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
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
