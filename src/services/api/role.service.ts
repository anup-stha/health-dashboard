/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { ApiEmptyArrayResponse, ApiNullResponse } from "@/models/api.model";
import {
  Permission,
  Role,
  RoleAddPermission,
  RoleAssignBody,
  RoleCreateBody,
  RoleDetailsResponse,
  RoleListResponse,
  RoleMutateResponse,
  RoleUpdateBody,
} from "@/models/role.model";
import { privateAgent } from "@/services/requests";

export const getAllRole = async (): Promise<Role[]> => {
  const response = await privateAgent.get<RoleListResponse>("/role");
  return response.data.data;
};

export const getRoleDetail = async (role_id: number): Promise<Role> => {
  const response = await privateAgent.get<RoleDetailsResponse>(`/role/detail/${role_id}`);
  return response.data.data;
};

export const postNewRole = async (role: RoleCreateBody): Promise<Role> => {
  const response = await privateAgent.post<RoleMutateResponse>(`/role/store`, role);
  return response.data.data;
};

export const postUpdateRole = async (role: RoleUpdateBody): Promise<Role> => {
  const { id, ...body } = role;
  const response = await privateAgent.post<RoleMutateResponse>(`/role/update/${id}`, body);
  return response.data.data;
};

export const postAssignPermissionToRole = async (permissions: number[], role_id: number): Promise<Permission[]> => {
  const response = await privateAgent.post<RoleAddPermission>(`/role/assign/${role_id}/permission`, { permissions });
  return response.data.data;
};

export const postRemovePermissionToRole = async (permission_id: number, role_id: number): Promise<string> => {
  const response = await privateAgent.post<ApiNullResponse>(`/role/remove/${role_id}/permission/${permission_id}`);
  return response.data.message;
};

export const postAssignChildRole = async (body: RoleAssignBody): Promise<string> => {
  const response = await privateAgent.post<ApiEmptyArrayResponse>(`/role/assignRole`, body);
  return response.data.message;
};

/**
 *
 * @param {number} p_role_id -> parent role id
 * @param {number} c_role_id -> child role id
 * @return {Promise<string>}
 */
export const deleteRemoveChildRole = async (p_role_id: number, c_role_id: number): Promise<string> => {
  const response = await privateAgent.post<ApiEmptyArrayResponse>(`/role/${p_role_id}/remove/${c_role_id}`);
  return response.data.message;
};
