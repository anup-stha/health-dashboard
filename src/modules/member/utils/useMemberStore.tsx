/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/3/22, 3:09 PM
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
  invoice_id: "___",
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
  setInvoiceId: (id: string) => {
    set(() => ({
      invoice_id: id,
    }));
  },
}));

export const useMemberStore = create(devtools(store, { name: "members" }));
