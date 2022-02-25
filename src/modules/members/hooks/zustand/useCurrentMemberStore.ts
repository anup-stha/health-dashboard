/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/25/22, 2:04 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

import { Member } from "@/modules/members/types";

import { RoleAccess } from "@/types";

const selectedMemberKey = "@sunya/current-member-state";

const initialState = {
  member: {} as Member,
  role: {} as RoleAccess,
  user: {} as Member,
  userRole: {} as RoleAccess,
};

const store = combine(initialState, (set) => ({
  setCurrentMember: (member: Member) => {
    set({
      member,
    });
  },

  setCurrentRole: (role: RoleAccess) => {
    set({
      role,
    });
  },
  setCurrentUser: (member: Member) => {
    set({
      user: member,
    });
  },

  setCurrentUserRole: (role: RoleAccess) => {
    set({
      userRole: role,
    });
  },
  clearCurrentMemberStore: () => {
    set({
      role: {} as RoleAccess,
      userRole: {} as RoleAccess,
    });
  },
}));

export const useCurrentMemberStore = create(
  devtools(persist(store, { name: selectedMemberKey }), {
    name: "current_member_state",
  })
);
