import create from "zustand";
import { OrganisationListType } from "@/types";
import { combine, devtools } from "zustand/middleware";
import { listOrganisations } from "@/services/requests/authRequests";

const initialState = {
  orgList: [] as OrganisationListType,
  loading: false,
  error: {
    state: false,
    message: "",
  },
};

export const store = combine(initialState, (set) => ({
  setOrgList: (list: OrganisationListType) => {
    set({ orgList: list });
  },
  toggleLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  setLoadingTrue: () => {
    set(() => ({ loading: true }));
  },
  setLoadingFalse: () => {
    set(() => ({ loading: false }));
  },

  getOrgListFromServer: async () => {
    await listOrganisations()
      .then((response) =>
        set({
          orgList: response.data,
          loading: false,
        })
      )
      .catch(() => {
        set({ loading: false });
      });
  },
  setError: (message: string) => {
    set({
      error: {
        state: true,
        message,
      },
    });
  },
}));

export const useOrgStore = create(devtools(store, "org"));
