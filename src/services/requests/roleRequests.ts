/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { AxiosResponse } from "axios";
import isEmpty from "lodash/isEmpty";
import { useQuery } from "react-query";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";

import { privateAgent } from ".";

import {
  NullDataResponse,
  PermissionListResponse,
  RoleAddBody,
  RoleDetailResponse,
  RoleListResponse,
  RoleUpdateBody,
} from "@/types";

export const listRole = () => {
  return privateAgent.get<RoleListResponse>("role/").then((response) => {
    return response;
  });
};

export const getRoleList = () => {
  return privateAgent.get<RoleListResponse>("role/").then((response) => {
    useRoleStore.getState().setRoleList(response.data.data);
    return response.data;
  });
};

export const useRoleList = () => {
  return useQuery("role-list", () => getRoleList(), {
    refetchOnWindowFocus: true,
    onSuccess: ({ data }) => {
      const role = useCurrentMemberStore.getState().role;
      const role_access = useAuthStore.getState().user?.role?.role_access?.[0];
      if (isEmpty(role) && role_access) {
        useCurrentMemberStore.getState().setCurrentRole(role_access);
      }
    },
  });
};

export const getRoleDetails = (id: number): Promise<AxiosResponse<RoleDetailResponse>> => {
  return privateAgent.get(`role/detail/${id}`);
};

const listRoleDetails = (roleId: number) => {
  if (!roleId) return;
  return privateAgent.get<RoleDetailResponse>(`role/detail/${roleId}`);
};

export const useRoleDetails = (roleId: number, callSuccess = true) => {
  return useQuery(["role-details", roleId], () => listRoleDetails(roleId), {
    enabled: roleId !== 0,
  });
};

export const addRole = ({ name, memberLimit, isPublic, description }: RoleAddBody) => {
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
        const allList = useRoleStore.getState().allRoleList.data;
        useRoleStore.getState().setRoleList([response.data.data, ...list]);
        useRoleStore.getState().setAllRoleList({
          data: [response.data.data, ...allList],
          message: response.data.message,
          status: response.data.status,
        });
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const updateRole = ({ id, name, memberLimit, isPublic, description }: RoleUpdateBody) => {
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
        const allRoles = useRoleStore.getState().allRoleList.data;

        const updatedAllRoles = allRoles.map((role) => (role.id === response.data.data.id ? response.data.data : role));
        const updatedArray = roles.map((role) => (role.id === response.data.data.id ? response.data.data : role));
        useRoleStore.getState().setRoleList(updatedArray);
        useRoleStore.getState().setAllRoleList({
          data: updatedAllRoles,
          status: response.data.status,
          message: response.data.message,
        });
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const getAllPermissions = (): Promise<AxiosResponse<PermissionListResponse>> => {
  return privateAgent.get("permission/");
};

export const getRoleDetail = async (idX: number) => {
  await getRoleDetails(idX)
    .then((response) => {
      useRoleStore.getState().setSelectedPermission({
        current: response.data.data.permissions,
        initial: response.data.data.permissions,
        selected: [],
        deselected: [],
      });
    })
    .catch((error) => {
      console.warn(error);
    });
};
export const addPermissionToRole = (id: number, permId: number[]) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<PermissionListResponse>(`role/assign/${id}/permission`, {
        permissions: permId,
      })
      .then(async () => {
        getRoleDetail(id);
        await getAllRoleList().then((response) => {
          const selectedRole = response.data.data.filter((role) => role.id === Number(id))[0];

          useRoleStore.getState().setSelectedRole(selectedRole);
        });
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
      .then(async () => {
        getRoleDetail(id);
        await getAllRoleList().then((response) => {
          const selectedRole = response.data.data.filter((role) => role.id === Number(id))[0];

          useRoleStore.getState().setSelectedRole(selectedRole);
        });
        resolve("Removed");
      })
      .catch((error) => reject(error.response))
  );
};

export const getAllRoleList = () => {
  return privateAgent.get<RoleListResponse>("role");
};

export const getRoleListBySlug = (role_slug: string) => {
  return privateAgent.get<RoleListResponse>(`/role/${role_slug}`);
};

export const assignChildRole = (data: { p_role_id: number; c_role_id: number }[]) => {
  return privateAgent.post<NullDataResponse>("role/assignRole", {
    data,
  });
};

export const deleteChildRole = (data: { p_role_id: number; c_role_id: number }) => {
  return privateAgent.delete<NullDataResponse>(`role/${data.p_role_id}/remove/${data.c_role_id}`);
};
