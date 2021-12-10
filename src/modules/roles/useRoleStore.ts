import { getAllPermissions } from "@/services/requests/roleRequests";
import { listRole } from "@/services/requests/roleRequests";
import { MemberDetailCategory, Permission, Role } from "@/types";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type roleInitialStateProps = {
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
      .catch(() => {});
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
