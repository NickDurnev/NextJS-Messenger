"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../Modal";
import Button from "../Button";
import Select from "@/app/components/inputs/Select";
import useTheme from "@/app/hooks/useTheme";
import useLocalStorage from "@/app/hooks/useLocalStorage";

interface AppSettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const themeKeys = ["light", "dark"];

const AppSettingsModal: FC<AppSettingsModalProps> = ({ isOpen, onClose }) => {
    const { set } = useTheme();
    const [savedTheme, setSavedTheme] = useLocalStorage("theme");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            theme: [{ label: savedTheme, value: savedTheme }],
        },
    });

    const theme = watch("theme");

    const onSubmit: SubmitHandler<FieldValues> = ({ theme }) => {
        setIsLoading(true);

        setSavedTheme(theme.value);
        set(theme.value);
        onClose();
        setIsLoading(false);
        toast.success("Settings updated");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-skin-main pb-12">
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
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button disabled={isLoading} secondary onClick={onClose}>
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
