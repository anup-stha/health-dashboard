/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:15 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";

import { MemberDetailCategory, Permission, Role, RoleListResponse } from "@/types";
import { getAllPermissions, listRole } from "@/services/requests/roleRequests";

type roleInitialStateProps = {
  allRoleList: {
    data: Role[];
    loading_status: boolean;
    res_message: string;
  };
  roleListBySlug: {
    data: Role[];
    loading_status: boolean;
    res_message: string;
  };
  roleList: Role[];
  selectedId: string | number;
  loading: boolean;
  allRoleLoading: boolean;
  selectedRole: Role;
  allPermission: Permission[];
  memberCategoryList: MemberDetailCategory[];
  selectedPermission: {
    all: Permission[];
    initial: Permission[];
    current: Permission[];
    selected: number[];
    deselected: number[];
  };
};

const initialState: roleInitialStateProps = {
  allRoleList: {
    data: [],
    loading_status: false,
    res_message: "",
  },
  roleListBySlug: {
    data: [],
    loading_status: false,
    res_message: "",
  },
  roleList: [],
  selectedId: 0,
  loading: true,
  allRoleLoading: true,
  selectedRole: {} as Role,
  allPermission: [],
  memberCategoryList: [],
  selectedPermission: {
    all: [],
    initial: [],
    current: [],
    selected: [],
    deselected: [],
  },
};

const store = combine(initialState, (set) => ({
  setAllRoleList: (roleListData: RoleListResponse) => {
    set({
      allRoleList: {
        data: roleListData.data,
        loading_status: roleListData.status,
        res_message: roleListData.message,
      },
    });
  },

  setRoleListBySlug: (roleListBySlugData: RoleListResponse) => {
    set({
      roleListBySlug: {
        data: roleListBySlugData.data,
        loading_status: roleListBySlugData.status,
        res_message: roleListBySlugData.message,
      },
    });
  },

  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setAllLoading: (loading: boolean) => {
    set({ allRoleLoading: loading });
  },
  setRoleList: (list: Role[]) => {
    set({ roleList: list });
  },
  setSelectedId: (id: number) => {
    set({ selectedId: id });
  },
  setSelectedRole: (role: Role) => {
    set({
      selectedRole: role,
      memberCategoryList: role.member_detail_categories,
    });
  },

  getRoleListFromServer: async () => {
    await listRole()
      .then((response) => {
        set({ roleList: response.data.data });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  addMemberDetail: (data: any) => {
    set({ memberCategoryList: data });
  },

  setAllPermission: (permission: any) => {
    set({ allPermission: permission });
  },

  setSelectedPermission: ({ current, initial, selected, deselected, all }: any) => {
    set((state) => ({
      selectedPermission: {
        current: current ?? state.selectedPermission.current,
        initial: initial ?? state.selectedPermission.initial,
        selected: selected ?? state.selectedPermission.selected,
        deselected: deselected ?? state.selectedPermission.deselected,
        all: all ?? state.selectedPermission.all,
      },
    }));
  },
  getAllPermission: async (): Promise<any> => {
    await getAllPermissions().then((response) => useRoleStore.getState().setAllPermission(response.data.data));
    return useRoleStore.getState().allPermission;
  },
}));

export const useRoleStore = create(devtools(store, { name: "role" }));
