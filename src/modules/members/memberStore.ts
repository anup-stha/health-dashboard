/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 12:43 AM
 *
 *
 */

import create from "zustand";
import {
  MemberDetails,
  MemberList,
  MemberListResponse,
  Role,
  SubscriptionDetails,
} from "@/types";
import { combine, devtools } from "zustand/middleware";
import { getMemberList } from "@/services/requests/memberRequests";

const initialState = {
  memberList: [] as MemberList,
  pagination: {},
  loading: false,
  selectedRole: {
    id: 0,
    name: "Choose any role",
  } as Role,
  status: {
    state: false,
    message: "",
  },
  selectedMemberDetails: [] as MemberDetails[],
  selectedMemberSubscription: ({} as SubscriptionDetails) || {},
};

export const store = combine(initialState, (set) => ({
  setMemberList: (res: MemberListResponse) => {
    set({
      status: { state: res.status, message: res.message },
      memberList: res.data.list,
      pagination: res.data.pagination,
    });
  },

  setSelectedMemberSubscription: (details: SubscriptionDetails) => {
    set({
      selectedMemberSubscription: details,
    });
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
  setSelectedRole: (role: Role) => {
    set(() => ({
      selectedRole: role,
    }));
  },

  setError: (message: string) => {
    set({
      status: {
        state: true,
        message,
      },
    });
  },

  getMemberListFromServer: async (id: string | number) => {
    await getMemberList(id)
      .then((res) =>
        set({
          status: { state: res.data.status, message: res.data.message },
          memberList: res.data.data.list,
          pagination: res.data.data.pagination,
        })
      )
      .catch(() => {
        set({ loading: false });
      });
  },

  setSelectedMemberDetails: (list: MemberDetails[]) => {
    set({
      selectedMemberDetails: list,
    });
  },
}));

export const memberStore = create(devtools(store, "member"));
