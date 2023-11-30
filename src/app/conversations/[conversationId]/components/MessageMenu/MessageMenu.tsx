"use client";

import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { MdDeleteOutline } from "react-icons/md";
import Button from "./Button";

interface MessageMenuProps {
    isOpen?: boolean;
    onClose: () => void;
    theme: string;
}

const MessageMenu: FC<MessageMenuProps> = ({ isOpen, onClose, theme }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className={clsx(theme, "absolute z-50 top-6 right-6")} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="relative transform overflow-hidden">
                        <div className={clsx(theme === 'dark' ? 'bg-[#3e3d3d]' : 'bg-[#f7f7f7]', "drop-shadow-md rounded-lg p-2 h-[200px]")}>
                            <Button icon={<MdDeleteOutline size={30} />} danger onClick={() => console.log('DELETE')}>Delete</Button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition.Root >
    )
};

export default MessageMenu;