import { useAuthStore } from "@/modules/auth/useTokenStore";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "./authRequests";
import { logOut } from "./authRequests";

const baseURL = process.env.NEXT_PUBLIC_TEMP_URL ?? "";

export const privateAgent = axios.create({
  baseURL,
});
export const publicAgent = axios.create({
  baseURL,
});

privateAgent.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  () => {
    useAuthStore.getState().removeUserData();
    toast.error("Credentials Has Expired! Please Log In Again!!");
  }
);

privateAgent.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const token = useAuthStore.getState().token;
    if (token && error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };

      return axios
        .post(`${baseURL}auth/refresh/`, axiosConfig)
        .then((res: any) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res);
            const tokenData = res.data.data;
            useAuthStore.getState().setToken(tokenData);
            return privateAgent(originalRequest);
          }
        })
        .catch((error) => {
          console.log(error);
          useAuthStore.getState().removeUserData();
          toast.error("Credentials Has Expired! Please Log In Again!!");
        });
    }
    return Promise.reject(error);
  }
);

export { login as loginUser, logOut as logoutUser };
