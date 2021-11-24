import create from "zustand";
import { OrganisationListType } from "@/types";
import { combine, devtools } from "zustand/middleware";
import { listOrganisations } from "@/lib/requests/authRequests";

const initialState = {
  organisationList: [] as OrganisationListType,
  loading: false,
};

export const store = combine(initialState, (set) => ({
  setOrgList: (list: OrganisationListType) => {
    set({ organisationList: list });
  },
  toggleLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  getOrgListFromServer: async () => {
    await listOrganisations().then((response) =>
      set({
        organisationList: response.data,
      })
    );
  },
}));

export const useOrgStore = create(devtools(store, "org"));
