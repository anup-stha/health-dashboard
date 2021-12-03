import { Role } from "@/types";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  roleList: [] as Role[],
  selectedId: 0 as number | string,
};

const store = combine(initialState, (set) => ({
  setRoleList: (list: Role[]) => {
    set({ roleList: list });
  },
  setSelectedId: (id: number) => {
    set({ selectedId: id });
  },
}));

export const useRoleStore = create(devtools(store, "roles"));
