"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import clsx from "clsx";

import useTheme from "@/app/hooks/useTheme";

import AuthForm from "./AuthForm";
import Loader from "@/app/components/Loader";
import styles from "./styles.module.css";

const AuthLayout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();
    return (
        <>
            <Link href="/">
                <span className="absolute top-5 left-9">
                    <BsFillArrowLeftCircleFill className="w-14 h-14 fill-sky-500 hover:fill-sky-600" />
                </span>
            </Link>
            {isLoading && <Loader />}
            <div className="m-auto xl:w-3/5 xl:h-[80vh] grid xl:grid-cols-2">
                <div
                    className={clsx(
                        styles.imgStyle,
                        theme === "dark"
                            ? "from-zinc-700 to-violet-950"
                            : "from-sky-500 to-blue-500"
                    )}
                >
                    <div className={styles.cartoonImg}></div>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                </div>
                <div
                    className="
                    right
            flex 
            min-h-full 
            flex-col 
            justify-center 
            py-12 
            sm:px-6 
            lg:px-8
            xl:rounded-tr-lg
            xl:rounded-br-lg
            bg-skin-main
          "
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <Image
                            height="48"
                            width="48"
                            className="mx-auto w-auto"
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <h2
                            className="
                mt-6 
                text-center 
                text-3xl 
                font-bold 
                tracking-tight 
                text-skin-base
              "
                        >
                            Sign in to your account
                        </h2>
                    </div>
                    <AuthForm isLoading={isLoading} setIsLoading={setIsLoading} />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
