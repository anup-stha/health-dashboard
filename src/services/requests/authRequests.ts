import { useAuthStore } from "@/modules/auth/useTokenStore";
import {
  LoginRequest,
  LoginResponse,
  RoleGetRequestResponse,
  RolePostRequestResponse,
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
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  (error) => {
    useAuthStore.getState().removeUserData();
  }
);

// response interceptor to refresh token on receiving token expired error
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
          if (res.status === 200) {
            const tokenData = res.data.data;
            useAuthStore.getState().setToken(tokenData);
            return privateAgent(originalRequest);
          }
        })
        .catch(() => {
          useAuthStore.getState().removeUserData();
        });
    }
    return Promise.reject(error);
  }
);

export const login = (
  loginRequest: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return publicAgent.post(`auth/login`, {
    email: loginRequest.email,
    password: loginRequest.password,
    device_type: "w",
  });
};

export const logOut = (): Promise<AxiosResponse> => {
  return privateAgent.post("auth/logout/");
};

export const listRole = (): Promise<AxiosResponse<RoleGetRequestResponse>> => {
  return privateAgent.get("role/");
};

export const listRoleDetails = (id: any): Promise<AxiosResponse<any>> => {
  return privateAgent.get(`role/detail/${id}`);
};

export const addRole = ({
  name,
  memberLimit,
  isPublic,
  description,
}: {
  name: string;
  memberLimit: number;
  isPublic: boolean;
  description: string;
}): Promise<AxiosResponse<RolePostRequestResponse>> => {
  return privateAgent.post("role/store/", {
    name,
    member_limit: memberLimit,
    public: isPublic ? 1 : 0,
    desc: description,
  });
};

export const updateRole = ({
  id,
  name,
  memberLimit,
  isPublic,
  description,
}: {
  id: string | number;
  name: string;
  memberLimit: number;
  isPublic: boolean;
  description: string;
}): Promise<AxiosResponse<RolePostRequestResponse>> => {
  return privateAgent.post(`role/update/${id}`, {
    name,
    member_limit: memberLimit,
    public: isPublic ? 1 : 0,
    desc: description,
  });
};

export const getAllPermissions = (): Promise<AxiosResponse<any>> => {
  return privateAgent.post("permission/");
};

// export const listOrganisations = (): Promise<
//   AxiosResponse<OrganisationListType>
// > => {
//   return privateAgent.get("organisations/");
// };

// export const addOrganisations = (
//   organisation: OrganisationRequestType
// ): Promise<AxiosResponse<OrganisationDetailType>> => {
//   return privateAgent.post("organisations/", organisation);
// };

// export const editOrganisations = (
//   organisation: OrganisationRequestType,
//   id: string | number
// ): Promise<AxiosResponse<OrganisationDetailType>> => {
//   return privateAgent.put(`organisations/${id}/`, organisation);
// };

// export const deleteOrganisations = (
//   id: string | number
// ): Promise<AxiosResponse<OrganisationDetailType>> => {
//   return privateAgent.delete(`organisations/${id}/`);
// };

// export const toggleActiveOrg = (
//   body: any,
//   id: string | number
// ): Promise<AxiosResponse<any>> => {
//   return privateAgent.put(`organisations/${id}/`, body);
// };
