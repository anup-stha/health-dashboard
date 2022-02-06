/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/6/22, 11:06 AM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import axios from "axios";
import toast from "react-hot-toast";
import { login, logOut } from "./authRequests";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

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
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  () => {
    useAuthStore.getState().removeUserData();
    toast.error("Credentials Has Expired! Please Log In Again!!", {
      id: "credentials-error",
    });
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
        .post(`${baseURL}auth/refresh/`, null, axiosConfig)
        .then((res: any) => {
          if (res.status === 200) {
            const tokenData = res.data.data;
            useAuthStore.getState().setToken(tokenData);
            return privateAgent(originalRequest);
          }
        })
        .catch((error) => {
          useAuthStore.getState().removeUserData();
          toast.error("Credentials Has Expired! Please Log In Again!!", {
            id: "log-out-toast",
          });
        });
    }
    return Promise.reject(error);
  }
);

export { login as loginUser, logOut as logoutUser };
