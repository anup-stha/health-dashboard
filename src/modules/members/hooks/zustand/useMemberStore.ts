/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";

import { MemberSubscriptionDetails } from "@/types";

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
