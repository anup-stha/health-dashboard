/* eslint-disable no-unused-vars */
import { useTokenStore } from "@/modules/auth/useTokenStore";
import {
  LoginRefreshRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  OrganisationDetailType,
  OrganisationListType,
  OrganisationRequestType,
  User,
  UserList,
  UserRequest,
} from "@/types";
import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/v1/";

const privateAgent = axios.create({
  baseURL,
});

const publicAgent = axios.create({
  baseURL,
});

privateAgent.interceptors.request.use(
  (config) => {
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `JWT ${accessToken}`;
    }

    return config;
  },
  (error) => {
    useTokenStore.getState().removeTokens();
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
        .post(`${baseURL}/auth/refresh/`, refreshRequest)
        .then((res: any) => {
          if (res.status === 200) {
            const tokenData: string = res.data.access;
            useTokenStore.getState().setTokens({
              accessToken: tokenData,
              refreshToken: refreshToken,
            });
            return privateAgent(originalRequest);
          }
        })
        .catch(() => {
          useTokenStore.getState().removeTokens();
        });
    }
    return Promise.reject(error);
  }
);

export const login = (
  loginRequest: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return publicAgent.post(`auth/login/`, loginRequest);
};

export const logOut = (): Promise<AxiosResponse> => {
  const refresh = useTokenStore.getState().refreshToken;
  const body: LogoutRequest = { refresh: refresh };
  return privateAgent.post("auth/revoke/", body);
};

export const verifyToken = (token: string): Promise<AxiosResponse> => {
  return publicAgent.post("auth/verify/", { token });
};

export const createUser = (body: UserRequest): Promise<AxiosResponse<User>> => {
  return privateAgent.post("users/", body);
};

export const listUserDetails = ({ id }: any): Promise<AxiosResponse<User>> => {
  return privateAgent.get(`users/${id}/`);
};

export const listUserList = (): Promise<AxiosResponse<UserList>> => {
  return privateAgent.get(`users/`);
};

export const listOrganisations = (): Promise<
  AxiosResponse<OrganisationListType>
> => {
  return privateAgent.get("organisations/");
};

export const deleteUser = (id: string | number): Promise<AxiosResponse> => {
  return privateAgent.delete(`users/${id}/`);
};

export const editUser = (
  body: UserRequest,
  id: string | number
): Promise<AxiosResponse<User>> => {
  return privateAgent.put(`users/${id}/`, body);
};

export const addOrganisations = (
  organisation: OrganisationRequestType
): Promise<AxiosResponse<OrganisationDetailType>> => {
  return privateAgent.post("organisations/", organisation);
};

export const editOrganisations = (
  organisation: OrganisationRequestType,
  id: string | number
): Promise<AxiosResponse<OrganisationDetailType>> => {
  return privateAgent.put(`organisations/${id}/`, organisation);
};

export const deleteOrganisations = (
  id: string | number
): Promise<AxiosResponse<OrganisationDetailType>> => {
  return privateAgent.delete(`organisations/${id}/`);
};

export const toggleActiveOrg = (
  body: any,
  id: string | number
): Promise<AxiosResponse<any>> => {
  return privateAgent.put(`organisations/${id}/`, body);
};