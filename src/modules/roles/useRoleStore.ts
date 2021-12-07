import { getAllPermissions, listRole } from "@/services/requests/authRequests";
import { Role } from "@/types";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  roleList: [] as Role[],
  selectedId: 0 as number | string,
  loading: true,
  allLoading: true,
  selectedRole: {} as Role,
  allPermission: [] as any[],
  memberCategoryList: [] as any[],
  selectedPermission: {
    all: [] as any[],
    initial: [] as any[],
    current: [] as any[],
    selected: [] as any[],
    deselected: [] as any[],
  },
};

const store = combine(initialState, (set) => ({
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setAllLoading: (loading: boolean) => {
    set({ allLoading: loading });
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
        useRoleStore.getState().setRoleList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addMemberDetail: (data: any) => {
    set({ memberCategoryList: data });
  },

  setAllPermission: (permission: any) => {
    set({ allPermission: permission });
  },

  setSelectedPermission: ({
    current,
    initial,
    selected,
    deselected,
    all,
  }: any) => {
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
    await getAllPermissions().then((response) =>
      useRoleStore.getState().setAllPermission(response.data.data)
    );
    return useRoleStore.getState().allPermission;
  },
}));

export const useRoleStore = create(devtools(store, "role"));
