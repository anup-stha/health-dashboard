/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 5:23 PM
 *
 *
 */

import { MemberSubscriptionDetails } from "@/types";
import { combine, devtools } from "zustand/middleware";
import create from "zustand";

const initialState = {
  selectedMemberSubscription: ({} as MemberSubscriptionDetails) || {},
  test_report: {
    start_date: 0,
    end_date: 0,
  },
};

export const store = combine(initialState, (set) => ({
  setSelectedMemberSubscription: (details: MemberSubscriptionDetails) => {
    set(() => {
      return {
        selectedMemberSubscription: details,
      };
    });
  },
  setTestReportDate: (start_date: number, end_date?: number) => {
    set((state) => ({
      ...state,
      test_report: {
        start_date: start_date ?? state.test_report.start_date,
        end_date: end_date ?? state.test_report.end_date,
      },
    }));
  },
}));

export const useMemberStore = create(devtools(store, { name: "members" }));
