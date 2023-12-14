'use client';
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/app/components/Loader";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const verifyToken = searchParams?.get("verifyToken");
    const id = searchParams?.get("id");
    if (!verifyToken || !id) {
        router.push('/auth');
    }

    axios
        .patch('/api/verify', { params: { verifyToken, id } })
        .then((res) => {
            if (res.status === 200) {
                router.push('/auth');
            }
        })

    return (
        <div className="h-screen w-screen bg-gray-300">
            <Loader />
        </div>
    );
};

export default VerifyEmail;
