import { getAllPermissions, listRole } from "@/services/requests/authRequests";
import { Role } from "@/types";
import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const initialState = {
  roleList: [] as Role[],
  selectedId: 0 as number | string,
  loading: true,
  selectedRole: {} as Role,
  allPermission: [],
};

const store = combine(initialState, (set) => ({
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setRoleList: (list: Role[]) => {
    set({ roleList: list });
  },
  setSelectedId: (id: number) => {
    set({ selectedId: id });
  },
  setSelectedRole: (role: any) => {
    set({ selectedRole: role });
  },

  getRoleListFromServer: async () => {
    await listRole()
      .then((response) => {
        useRoleStore.getState().setRoleList(response.data.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  setAllPermission: (permission: any) => {
    set({ allPermission: permission });
  },

  getAllPermission: async (): Promise<any> => {
    await getAllPermissions().then((response) =>
      useRoleStore.getState().setAllPermission(response.data.data)
    );
    return useRoleStore.getState().allPermission;
  },
}));

export const useRoleStore = create(
  devtools(persist(store, { name: "roles" }), "role")
);
