/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 3:30 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import { Subscription } from "@/types";

type roleInitialStateProps = {
  subscriptionList: any[];
  loading: boolean;
  selectedSubscription: Subscription;
};

const initialState: roleInitialStateProps = {
  subscriptionList: [],

  loading: true,
  selectedSubscription: {} as Subscription,
};

const store = combine(initialState, (set) => ({
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setSubscriptionList: (list: any) => {
    set({ subscriptionList: list });
  },
  setSubscription: (subs: Subscription) => {
    set(() => ({ selectedSubscription: subs }));
  },
}));

export const useSubscriptionStore = create(devtools(store, "subscription"));
