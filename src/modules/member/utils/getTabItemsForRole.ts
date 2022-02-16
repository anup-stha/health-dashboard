/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 3:26 PM
 *
 *
 */

type RoleType =
  | "org_admin"
  | "org_operator"
  | "patient"
  | "individual"
  | string;
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
      return ["overview", "subscriptions", "tests", "devices", "settings"];
    case "org_admin":
      return ["overview", "members", "subscriptions", "devices", "settings"];
    case "org_operator":
      return ["overview", "members", "devices", "settings"];
    case "patient":
      return ["overview", "tests", "medical history", "settings"];
    default:
      return ["overview", "subscriptions", "settings"];
  }
}
