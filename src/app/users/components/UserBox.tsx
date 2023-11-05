"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import axios from "axios";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserBoxProps {
  data: User;
}
const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center bg-skin-main p-3 hover:bg-skin-hover rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1 px-2">
              <p className="text-sm font-medium text-skin-base">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
