"use client";

import { FC, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
//#HOOKS and HELPERS
import useToast from "@/app/hooks/useToast";
import useAxiosAuth from "@/app/libs/hooks/useAxiosAuth";
import stringAvatar from "@/helpers/avatarFormatter";
//#COMPONENTS
import Modal from "../Modal";
import Input from "../inputs/Input";
import Button from "../Button";

interface ProfileSettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User | null;
}

const ProfileSettingsModal: FC<ProfileSettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useToast(error);
    const axiosAuth = useAxiosAuth();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axiosAuth
            .patch("/user", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                    <div className="border-b border-skin-main pb-8 space-y-5">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-skin-base">
                                Profile
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-skin-additional">
                                Edit your information.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-skin-base">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                {image && (
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={image || currentUser?.image}
                                        alt="Avatar"
                                    />
                                )}
                                {!image && currentUser?.name && (
                                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-purple-500 text-gray-50 text-2xl border-0">
                                        {stringAvatar(currentUser.name)}
                                    </div>
                                )}
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset="kqj1yrdh"
                                >
                                    <Button disabled={isLoading} secondary type="button">
                                        Change
                                    </Button>
                                </CldUploadButton>
                            </div>
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

export default ProfileSettingsModal;
