/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/15/22, 3:28 PM
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
  | "settings";

/**
 *
 * @param {RoleType} role to generate tabs
 * @return {TabType[]} array of tabs
 */
export function getTabItemsForRole(role: RoleType): TabType[] {
  switch (role) {
    case "individual":
      return [
        "overview",
        "subscriptions",
        "billing",
        "tests",
        "devices",
        "settings",
      ];
    case "org_admin":
      return [
        "overview",
        "members",
        "subscriptions",
        "billing",
        "devices",
        "settings",
      ];
    case "org_operator":
      return ["overview", "members", "devices", "settings"];
    case "patient":
      return ["overview", "tests", "settings"];
    default:
      return ["overview", "settings"];
  }
}
