import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useEffect } from "react";

const useToast = (error: AxiosError | null) => {
  useEffect(() => {
    const responseData = error?.response?.data;

    if (!responseData) {
      return;
    }

    if (error?.response?.status === 500) {
      toast.error("Something went wrong!");
      return;
    }

    if (typeof responseData === "string") {
      toast.error(responseData);
    }
  }, [error]);
};

export default useToast;
