/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:01 PM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";

type RoleType = "org_admin" | "org_operator" | "patient" | "individual" | string;
type TabType =
  | "overview"
  | "members"
  | "subscriptions"
  | "billing"
  | "tests"
  | "devices"
  | "settings"
  | "medical history";

/**
 *
 * @param {RoleType} role to generate tabs
 * @return {TabType[]} array of tabs
 */
export function getTabItemsForRole(role: RoleType): TabType[] {
  switch (role) {
    case "individual":
      return ["overview", "subscriptions", "tests", "devices"];

    case "org_admin":
      if (useAuthStore.getState().user.id !== 1) {
        return ["overview", "subscriptions"];
      }
      return ["overview", "members", "subscriptions", "devices"];

    case "org_operator":
      if (useAuthStore.getState().user.id !== 1) {
        return ["overview"];
      }
      return ["overview", "devices"];

    case "patient":
      return ["overview", "tests", "medical history"];

    case "school_admin":
      if (useAuthStore.getState().user.id !== 1) {
        return ["overview"];
      }
      return ["overview", "members", "subscriptions"];

    case "teacher":
      return ["overview", "tests", "medical history"];

    case "student":
      return ["overview", "tests", "medical history"];

    default:
      return ["overview"];
  }
}
