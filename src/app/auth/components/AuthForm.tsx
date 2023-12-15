"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BsGithub, BsGoogle, BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginformSchema, RegisterformSchema } from "../validation";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import useToast from "@/app/hooks/useToast";
import Loader from "@/app/components/Loader";
import scrollTo from "@/helpers/scrollTo";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useToast(error);

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/users");
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onChange",
        resolver: yupResolver<FieldValues>(
            variant === "LOGIN" ? LoginformSchema : RegisterformSchema
        ),
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        scrollTo();
        setIsLoading(true);

        if (variant === "REGISTER") {
            axios
                .post("/api/register", data)
                .then(() => {
                    reset();
                    toast.success("Check your email for verification!");
                    setVariant("LOGIN");
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            axios
                .post("/api/login", data)
                .then(() => {
                    toast.success("Successfully logged in");
                    router.push("/users");
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials");
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Successfully logged in");
                }
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    return (
        <>
            {isLoading && <Loader />}
            <Link href="/">
                <span className="absolute top-12 left-5">
                    <BsFillArrowLeftCircleFill className="w-12 h-12 fill-sky-500 hover:fill-sky-600" />
                </span>
            </Link>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div
                    className="
        bg-skin-main
          px-4
          py-8
          border-[1px]
          border-skin-main
          sm:rounded-lg
          sm:px-10
        "
                >
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {variant === "REGISTER" && (
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="name"
                                label="Name"
                            />
                        )}
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="email"
                            label="Email address"
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="password"
                            label="Password"
                            type="password"
                        />
                        {variant === "REGISTER" && (
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="cpassword"
                                label="Confirm password"
                                type="password"
                            />
                        )}
                        <div>
                            <Button disabled={isLoading} fullWidth type="submit">
                                {variant === "LOGIN" ? "Sign in" : "Register"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div
                                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
                            >
                                <div className="w-full border-t border-skin-main" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-skin-main px-2 text-skin-base">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction("github")}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction("google")}
                            />
                        </div>
                    </div>
                    <div
                        className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-skin-additional
          "
                    >
                        <div>
                            {variant === "LOGIN"
                                ? "New to Messenger?"
                                : "Already have an account?"}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === "LOGIN" ? "Create an account" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
