/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:21 PM
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
  | "medical history"
  | "doctors"
  | "patients";

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
      if (useAuthStore.getState().user?.role.slug === "accessor") {
        return ["patients"];
      }
      if (useAuthStore.getState().user?.id !== 1) {
        return ["overview", "subscriptions", "doctors"];
      }
      return ["overview", "members", "doctors", "subscriptions", "devices"];

    case "org_operator":
      if (useAuthStore.getState().user?.id !== 1) {
        return ["overview"];
      }
      return ["overview", "devices"];

    case "patient":
      return ["overview", "tests", "medical history"];

    case "school_admin":
      if (useAuthStore.getState().user?.id !== 1) {
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
