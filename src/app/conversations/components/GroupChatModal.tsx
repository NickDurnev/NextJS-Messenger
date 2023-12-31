import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//#HOOKS
import useAxiosAuth from "@/app/libs/hooks/useAxiosAuth";
import useToast from "@/app/hooks/useToast";

import { GroupChatSchema } from "@/app/conversations/validation";

import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";

interface GroupChatModelProps {
    users: User[];
    isOpen?: boolean;
    onClose: () => void;
}

const GroupChatModel: FC<GroupChatModelProps> = ({
    users,
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosAuth = useAxiosAuth();
    useToast(error);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
        mode: "onChange",
        resolver: yupResolver<FieldValues>(GroupChatSchema),
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = ({ members, name }) => {
        setIsLoading(true);

        axiosAuth
            .post("/conversations", { members, name, isGroup: true })
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
                <div className="space-y-12">
                    <div className="border-b border-skin-main pb-12">
                        <h2 className="text-base font-semibold leading-7 text-skin-base">
                            Create a group chat
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-skin-additional">
                            Create a chat with more than 2 people
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                register={register}
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                label="Members"
                                disabled={isLoading}
                                value={members}
                                errors={errors}
                                id="members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange={(value) =>
                                    setValue("members", value, { shouldValidate: true })
                                }
                                isMulti
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default GroupChatModel;
