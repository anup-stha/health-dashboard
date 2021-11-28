import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const openState = "@sunya/sidebar-open-state";

const initialState = {
  open: false,
};

export const store = combine(initialState, (set) => ({
  toggleOpen: () => {
    set((state) => ({
      open: !state.open,
    }));
  },
}));

export const useSideBarStore = create(
  devtools(persist(store, { name: openState }))
);
