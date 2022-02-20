/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:24 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

import { Member } from "@/modules/members/types";

import { Role } from "@/types";

const selectedMemberKey = "@sunya/current-member-state";

const initialState = {
  member: {} as Member,
  role: {} as Role,
  user: {} as Member,
  userRole: {} as Role,
};

const store = combine(initialState, (set) => ({
  setCurrentMember: (member: Member) => {
    set({
      member,
    });
  },

  setCurrentRole: (role: Role) => {
    set({
      role,
    });
  },
  setCurrentUser: (member: Member) => {
    set({
      user: member,
    });
  },

  setCurrentUserRole: (role: Role) => {
    set({
      userRole: role,
    });
  },
  clearCurrentMemberStore: () => {
    set({
      role: {} as Role,
    });
  },
}));

export const useCurrentMemberStore = create(
  devtools(persist(store, { name: selectedMemberKey }), {
    name: "current_member_state",
  })
);
