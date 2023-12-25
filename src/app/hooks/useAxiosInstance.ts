import axios from "axios";
import { useSession } from "next-auth/react";

const useAxiosInstance = () => {
  const { data: session, update } = useSession();
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { status } = error.response;

      // If the token has expired or the user is unauthorized, attempt to refresh the token
      if (status === 401 || status === 403) {
        console.log("UPDATING TOKEN");
        await update({ name: session?.user?.name });
        // Retry the original request with the new token
        return axiosInstance(error.config);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
