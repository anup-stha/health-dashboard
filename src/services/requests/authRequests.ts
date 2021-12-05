import Router from "next/router";
import { AxiosResponse } from "axios";

import { publicAgent, privateAgent } from ".";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RoleGetRequestResponse,
  RolePostRequestResponse,
} from "@/types";
import { useAuthStore } from "@/modules/auth/useTokenStore";

export const login = (loginRequest: LoginRequest) => {
  return new Promise((resolve, reject) =>
    publicAgent
      .post<LoginResponse>(`auth/login`, {
        email: loginRequest.email,
        password: loginRequest.password,
        device_type: "w",
      })
      .then((response) => {
        useAuthStore.getState().setUserData(response.data);
        Router.push("/dashboard");
        resolve("Logged In Succesfully");
      })
      .catch((error) => {
        reject(error.message);
      })
  );
};

export const logOut = () => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<LogoutRequest>("auth/logout/")
      .then(() => {
        useAuthStore.getState().removeUserData();
        Router.push("/");
        resolve("Logged Out Successfully");
      })
      .catch(() => {
        useAuthStore.getState().removeUserData();
        Router.push("/");
        resolve("Logged Out Successfully");
      })
  );
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
