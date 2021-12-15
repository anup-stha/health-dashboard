/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 2:26 PM
 *
 *
 */

import { AxiosResponse } from "axios";
import {
  NullDataResponse,
  PermissionListResponse,
  RoleAddBody,
  RoleDetailResponse,
  RoleListResponse,
  RoleUpdateBody,
} from "@/types";

import { privateAgent } from ".";
import { getRoleDetail } from "./authRequests";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import useSWR from "swr";

export const listRole = (): Promise<AxiosResponse<RoleListResponse>> => {
  return privateAgent.get("role/");
};

export const getRoleDetails = (
  id: number
): Promise<AxiosResponse<RoleDetailResponse>> => {
  return privateAgent.get(`role/detail/${id}`);
};

const listRoleDetails = (url: string) =>
  privateAgent.get<RoleDetailResponse>(url).then((response) => {
    return response.data.data;
  });

export const useRoleDetails = (roleId: number) => {
  return useSWR(`role/detail/${roleId}`, listRoleDetails, {
    refreshInterval: 1000000,
  });
};

export const addRole = ({
  name,
  memberLimit,
  isPublic,
  description,
}: RoleAddBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<RoleDetailResponse>("role/store/", {
        name,
        member_limit: memberLimit,
        public: isPublic ? 1 : 0,
        desc: description,
      })
      .then((response) => {
        const list = useRoleStore.getState().roleList;
        useRoleStore.getState().setRoleList([response.data.data, ...list]);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const updateRole = ({
  id,
  name,
  memberLimit,
  isPublic,
  description,
}: RoleUpdateBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<RoleDetailResponse>(`role/update/${id}`, {
        name,
        member_limit: memberLimit,
        public: isPublic ? 1 : 0,
        desc: description,
      })
      .then((response) => {
        const roles = useRoleStore.getState().roleList;
        const updatedArray = roles.map((role) =>
          role.id === response.data.data.id ? response.data.data : role
        );
        useRoleStore.getState().setRoleList(updatedArray);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const getAllPermissions = (): Promise<
  AxiosResponse<PermissionListResponse>
> => {
  return privateAgent.get("permission/");
};

export const addPermissionToRole = (id: number, permId: number[]) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<PermissionListResponse>(`role/assign/${id}/permission`, {
        permissions: permId,
      })
      .then(() => {
        getRoleDetail(id);
        resolve("Saved");
      })
      .catch((error) => reject(error.response))
  );
};

export const removePermissionFromRole = (id: any, permId: any) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<NullDataResponse>(`role/remove/${id}/permission/${permId}`, {
        permissions: permId,
      })
      .then(() => {
        getRoleDetail(id);
        resolve("Removed");
      })
      .catch((error) => reject(error.response))
  );
};
