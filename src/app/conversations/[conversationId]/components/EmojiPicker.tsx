"use client";

import { FC, Fragment } from "react";
import dynamic from "next/dynamic";
import { Dialog, Transition } from "@headlessui/react";
import { EmojiClickData, Theme } from "emoji-picker-react";
import clsx from "clsx";

const Picker = dynamic(
    () => {
        return import("emoji-picker-react");
    },
    { ssr: false }
);

interface EmojiPickerProps {
    isOpen?: boolean;
    onClose: () => void;
    onEmojiClick: (emoji: EmojiClickData) => void;
    className?: string;
    theme: Theme;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ isOpen, onClose, onEmojiClick, className, theme }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className={clsx("absolute z-50")} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className={clsx(className, "relative transform overflow-hidden")}>
                        <Picker onEmojiClick={onEmojiClick} theme={theme} />
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition.Root >
    )
};

export default EmojiPicker;