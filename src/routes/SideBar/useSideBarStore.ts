import { isServer } from "@/services/isServer";
import create from "zustand";

const openState = "@sunya/sidebar-open-state";

interface SideBarState {
  open: boolean;
  toggleOpen: () => void;
}

const stringToBoolean = (str: string | null) =>
  str === "false" ? false : true;

export const useSideBarStore = create<SideBarState>((set) => ({
  open:
    !isServer &&
    (localStorage.getItem(openState) === undefined
      ? false
      : stringToBoolean(localStorage.getItem(openState))),

  toggleOpen: () => {
    set((state) => {
      localStorage.setItem(openState, (!state.open).toString());

      return {
        open: !state.open,
      };
    });
  },
}));
