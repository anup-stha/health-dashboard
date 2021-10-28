/* eslint-disable no-unused-vars */
import { useTokenStore } from "@/modules/auth/useTokenStore";
import {
  LoginRefreshRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
} from "@/types";
import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.sunya.health/";

const privateAgent = axios.create({
  baseURL,
});

const publicAgent = axios.create({
  baseURL,
});

privateAgent.interceptors.request.use(
  (config) => {
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken && config.headers)
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor to refresh token on receiving token expired error
privateAgent.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const refreshToken = useTokenStore.getState().refreshToken;
    if (
      refreshToken &&
      error?.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshRequest: LoginRefreshRequest = { refresh: refreshToken };
      return axios
        .post(`${baseURL}oauth/token/refresh/`, refreshRequest)
        .then((res: any) => {
          if (res.status === 200) {
            const tokenData: string = res.data.access_token;
            useTokenStore.getState().setTokens({
              accessToken: tokenData,
              refreshToken: refreshToken,
            });
            return privateAgent(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export const login = (
  loginRequest: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return publicAgent.post(`oauth/token/`, loginRequest);
};

export const logOut = (): Promise<AxiosResponse> => {
  const refresh = useTokenStore.getState().refreshToken;
  const body: LogoutRequest = { refresh_token: refresh };
  return privateAgent.post("oauth/token/revoke/", body);
};
