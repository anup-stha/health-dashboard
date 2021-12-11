/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { LoginRequest, LoginResponse, LogoutRequest } from "@/types";
import Router from "next/router";
import { privateAgent, publicAgent } from ".";
import { listRoleDetails } from "./roleRequests";

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
        reject(error.response);
      })
  );
};

export const logOut = () => {
  return new Promise((resolve) =>
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

export const getRoleDetail = async (idX: number) => {
  await listRoleDetails(idX)
    .then((response) => {
      useRoleStore.getState().setSelectedPermission({
        current: response.data.data.permissions,
        initial: response.data.data.permissions,
        selected: [],
        deselected: [],
      });
    })
    .catch(() => {});
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
