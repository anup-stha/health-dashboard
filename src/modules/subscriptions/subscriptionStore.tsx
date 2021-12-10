import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type roleInitialStateProps = {
  subscriptionList: any[];
  loading: boolean;
  selectedSubscription: {
    id: number;
    name: string;
  };
};

const initialState: roleInitialStateProps = {
  subscriptionList: [],

  loading: true,
  selectedSubscription: {
    id: 0,
    name: "12",
  },
};

const store = combine(initialState, (set) => ({
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setSubscriptionList: (list: any) => {
    set({ subscriptionList: list });
  },
  setSubscription: (role: { id: number; name: string }) => {
    set(() => ({ selectedSubscription: { id: role.id, name: role.name } }));
  },
}));

export const useSubscriptionStore = create(devtools(store, "subscription"));
