/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";

import { Subscription, SubscriptionTestDetails } from "@/types";

type roleInitialStateProps = {
  subscriptionList: {
    roleId: number | undefined;
    list: any[];
  };

  loading: boolean;
  selectedSubscription: Subscription;
  subscriptionDetails: SubscriptionTestDetails;
};

const initialState: roleInitialStateProps = {
  subscriptionList: { list: [], roleId: undefined },
  loading: true,
  selectedSubscription: {} as Subscription,
  subscriptionDetails: [],
};

const store = combine(initialState, (set) => ({
  setLoading: (loading: boolean) => {
    set({ loading: loading });
  },
  setSubscriptionList: (list: any) => {
    set((state) => ({
      subscriptionList: {
        roleId: state.subscriptionList.roleId,
        list: list,
      },
    }));
  },
  setSubscriptionRole: (roleId: number) => {
    set((state) => ({
      subscriptionList: {
        roleId,
        list: state.subscriptionList.list,
      },
    }));
  },

  setSubscription: (subs: Subscription) => {
    set(() => ({ selectedSubscription: subs }));
  },

  setSubscriptionTestDetails: (details: SubscriptionTestDetails) => {
    set({
      subscriptionDetails: details,
    });
  },
}));

export const useSubscriptionStore = create(devtools(store, { name: "subscription" }));
