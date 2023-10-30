"use client";

import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "../components/MessageInput";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
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
  return (
    <div className="py-4 px-4 bg-skin-main border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto size={30} className="text-skin-mutated" />
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
          className="rounded-full p-2 bg-skin-button-accent hover:bg-skin-button-accent-hover transition cursor-pointer"
        >
            <HiPaperAirplane size={18} className="text-skin-button-text"/>
        </button>
      </form>
    </div>
  );
};

export default Form;
