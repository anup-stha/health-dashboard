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

export const listRole = (): Promise<AxiosResponse<RoleListResponse>> => {
  return privateAgent.get("role/");
};

export const listRoleDetails = (
  id: number
): Promise<AxiosResponse<RoleDetailResponse>> => {
  return privateAgent.get(`role/detail/${id}`);
};

export const addRole = ({
  name,
  memberLimit,
  isPublic,
  description,
}: RoleAddBody): Promise<AxiosResponse<RoleDetailResponse>> => {
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
}: RoleUpdateBody): Promise<AxiosResponse<RoleDetailResponse>> => {
  return privateAgent.post(`role/update/${id}`, {
    name,
    member_limit: memberLimit,
    public: isPublic ? 1 : 0,
    desc: description,
  });
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
