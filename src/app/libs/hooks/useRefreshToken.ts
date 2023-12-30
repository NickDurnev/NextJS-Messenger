"use client";

import axios from "@/app/libs/axios";
import { signIn, signOut, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      const res = await axios.post("auth/refresh", {
        refreshToken: session?.user.refreshToken,
      });
      if (session) session.user.accessToken = res.data.accessToken;
      else signIn();
    } catch (error) {
      console.log(error);
      signOut();
    }
  };
  return refreshToken;
};
