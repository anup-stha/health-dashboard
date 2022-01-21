/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/21/22, 3:12 PM
 *
 *
 */

import create from "zustand";
import {
  MedicalHistory,
  MedicalHistoryGetResponse,
  Member,
  MemberDetails,
  MemberList,
  MemberListResponse,
  MemberSubscriptionDetails,
  MemberTestListData,
  PaginationObject,
  Role,
  RoleSummary,
  Test,
} from "@/types";
import { combine, devtools } from "zustand/middleware";
import { getMembersList } from "@/services/requests/memberRequests";

const initialState = {
  memberList: [] as MemberList,
  pagination: {} as PaginationObject,
  loading: false,
  selectedRole: {
    id: 0,
    name: "Choose any role",
  } as Role | RoleSummary,
  nestedSelectedRole: {} as RoleSummary,
  status: {
    state: false,
    message: "",
  },
  selectedMember: {} as Member | undefined,
  selectedMemberDetails: [] as MemberDetails[],
  selectedMemberSubscription: ({} as MemberSubscriptionDetails) || {},

  selectedTestInProfile: {} as Test,
  selectedTestDetailsInProfile: {} as MemberTestListData,

  patientMedicalHistoryList: {
    data: [] as MedicalHistory[],
    res_message: "",
    loading_status: false,
  },
  memberListBySlug: {
    data: [] as MemberList,
    selectedMember: {} as Member | undefined,
    pagination: {},
    res_message: "",
    loading_status: false,
  },
  parent_id: "",
  parent_role: "",
  parent_page: "1",

  test_report: {
    start_date: 0,
    end_date: 0,
  },
};

export const store = combine(initialState, (set) => ({
  setTestReportDate: (start_date: number, end_date?: number) => {
    set((state) => ({
      ...state,
      test_report: {
        start_date: start_date ?? state.test_report.start_date,
        end_date: end_date ?? state.test_report.end_date,
      },
    }));
  },

  setParent: (parent_id: string, parent_role: string, parent_page = "1") => {
    set({
      parent_id,
      parent_role,
      parent_page,
    });
  },

  setPatientMedicalHistoryList: (res: MedicalHistoryGetResponse) => {
    set({
      patientMedicalHistoryList: {
        data: res.data,
        res_message: res.message,
        loading_status: res.status,
      },
    });
  },

  setMemberListBySlug: (res: MemberListResponse) => {
    set((state) => ({
      memberListBySlug: {
        data: res.data.list,
        pagination: res.data.pagination,
        res_message: res.message,
        loading_status: res.status,
        selectedMember: state.memberListBySlug.selectedMember,
      },
    }));
  },

  setSelectedMemberBySlug: (member: Member | undefined) => {
    set((state) => ({
      memberListBySlug: {
        ...state.memberListBySlug,
        selectedMember: member,
      },
    }));
  },

  setMemberList: (res: MemberListResponse) => {
    set({
      status: { state: res.status, message: res.message },
      memberList: res.data.list,
      pagination: res.data.pagination,
    });
  },

  setSelectedMember: (member: Member | undefined) => {
    set({
      selectedMember: member,
    });
  },

  setOnlyMemberList: (res: MemberList) => {
    set({
      memberList: res,
    });
  },

  setSelectedTestDetailsInProfile: (data: MemberTestListData) => {
    set({
      selectedTestDetailsInProfile: data,
    });
  },

  clearTestDetailsInProfile: () => {
    set({
      selectedTestDetailsInProfile: [] as unknown as MemberTestListData,
    });
  },

  setSelectedTestInProfile: (list: Test) => {
    set({
      selectedTestInProfile: list,
    });
  },

  setSelectedMemberSubscription: (details: MemberSubscriptionDetails) => {
    set(() => {
      return {
        selectedMemberSubscription: details,
      };
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
  setSelectedRole: (role: Role | RoleSummary) => {
    set(() => ({
      selectedRole: role,
    }));
  },

  setNestedSelectedRole: (role: RoleSummary) => {
    set(() => ({
      nestedSelectedRole: role,
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
    await getMembersList(Number(id))
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

export const useMemberStore = create(devtools(store, { name: "member" }));
