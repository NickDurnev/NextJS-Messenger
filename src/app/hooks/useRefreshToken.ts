"use client";

import axios from "@/app/libs/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    console.log(session?.user);
    const res = await axios.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};
