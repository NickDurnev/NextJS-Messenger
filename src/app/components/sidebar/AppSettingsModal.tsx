"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import Modal from "../Modal";
import Input from "../inputs/Input";
import Button from "../Button";
import Select from "@/app/components/inputs/Select";


interface AppSettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const themeKeys = ["Light", "Dark"];

const AppSettingsModal: FC<AppSettingsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            themes: [],
        },
    });

    const themes = watch("themes");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-skin-main pb-12">
                        <h2 className="text-base font-semibold leading-7 text-skin-base">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-skin-additional">
                            Edit your information.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            {/* <Input
                                disabled={isLoading}
                                label="Name"
                                id="theme"
                                errors={errors}
                                required
                                register={register}
                            /> */}
                            <Select
                                disabled={isLoading}
                                label="Themes"
                                options={themeKeys.map((theme) => ({
                                    value: theme,
                                    label: theme,
                                }))}
                                onChange={(value) =>
                                    setValue("themes", value, { shouldValidate: true })
                                }
                                value={themes}
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
