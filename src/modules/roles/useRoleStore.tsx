import { Role } from "@/types";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  roleList: [] as Role[],
};

const store = combine(initialState, (set) => ({
  setRoleList: (list: Role[]) => {
    set({ roleList: list });
  },
}));

export const useRoleStore = create(devtools(store, "roles"));
