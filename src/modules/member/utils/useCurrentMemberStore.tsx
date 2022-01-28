/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 11:36 AM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { Member } from "@/modules/member/types";
import { Role } from "@/types";

const selectedMemberKey = "@sunya/current-member";

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
}));

export const useCurrentMemberStore = create(
  devtools(persist(store, { name: selectedMemberKey }), {
    name: "current_member",
  })
);
