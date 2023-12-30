"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from '@/app/libs/axios';
import Loader from "@/app/components/Loader";
import { useEffect } from "react";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const verifyToken = searchParams?.get("verifyToken");
    const id = searchParams?.get("id");

    if (!verifyToken || !id) {
        router.replace("/auth");
    }

    useEffect(() => {
        axios.patch("/verify", { verifyToken, id }).then((res) => {
            if (res.status === 200) {
                router.replace("/auth");
            }
        });
    }, [id, router, verifyToken]);

    return (
        <div className="h-screen w-screen bg-gray-300">
            <Loader />
        </div>
    );
};

export default VerifyEmail;
