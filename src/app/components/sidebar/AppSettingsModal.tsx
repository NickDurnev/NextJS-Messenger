"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../Modal";
import Button from "../Button";
import Select from "@/app/components/inputs/Select";
import useTheme from "@/app/hooks/useTheme";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import TextButton from "../buttons/TextButton";

interface AppSettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    openProfileSettings: () => void;
}

const themeKeys = ["light", "dark"];

const AppSettingsModal: FC<AppSettingsModalProps> = ({
    isOpen,
    onClose,
    openProfileSettings,
}) => {
    const { set } = useTheme();
    const [savedTheme, setSavedTheme] = useLocalStorage("theme");
    const [conversationId, setConversationId] = useLocalStorage("conversationId");
    const [isLoading, setIsLoading] = useState(false);

    const {
        formState: { isDirty },
        handleSubmit,
        setValue,
        watch,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            theme: { label: savedTheme, value: savedTheme },
        },
    });

    const theme = watch("theme");

    const onSubmit: SubmitHandler<FieldValues> = ({ theme }) => {
        setIsLoading(true);

        setSavedTheme(theme.value);
        set(theme.value);
        onClose();
        setIsLoading(false);
        if (isDirty || theme.value !== savedTheme) {
            toast.success("Settings updated");
        }
    };

    const handleCancel = () => {
        onClose();
        reset({ theme: { label: savedTheme, value: savedTheme } });
    };

    const handleSignOut = () => {
        signOut();
        setConversationId("");
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="pb-12 space-y-4">
                        <h2 className="text-base font-semibold leading-7 text-skin-base">
                            Settings
                        </h2>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Select
                                disabled={isLoading}
                                label="Theme"
                                options={themeKeys.map((theme) => ({
                                    value: theme,
                                    label: theme,
                                }))}
                                onChange={(value) =>
                                    setValue("theme", value, {
                                        shouldValidate: true,
                                    })
                                }
                                value={theme}
                            />
                        </div>
                        <ul>
                            <li>
                                <TextButton onClick={openProfileSettings} isMobileOnly>
                                    Profile
                                </TextButton>
                            </li>
                            <li>
                                <TextButton onClick={handleSignOut}>Logout</TextButton>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={handleCancel}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button disabled={isLoading} type="submit">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AppSettingsModal;
