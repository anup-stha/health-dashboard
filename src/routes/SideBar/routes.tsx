/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 1:23 PM
 *
 *
 */

import { Polygon, Sliders, TestTube, UserList, Users } from "phosphor-react";
import React from "react";
import { Category2, Home } from "iconsax-react";

const convertToLink = (json: RouteObjectType[], ansArray: string[], extra?: string[]) => {
  json.map((element) => {
    if ("link" in element) {
      ansArray.push(element.link ? element["link"] : "");
    } else {
      convertToLink(element.children ? element["children"] : [], ansArray);
    }
  });
  extra && ansArray.push(...extra);
  return ansArray;
};

export type RouteObjectType =
  | {
      id: number | string;
      title: string;
      icon: React.ReactNode;
      link?: string;
      children?: never;
    }
  | {
      id: number | string;
      title: string;
      icon: React.ReactNode;
      link?: never;
      children?: RouteObjectType[];
    };

const adminExtraRoute = [
  "/roles/[permission]",
  "/tests/[test]",
  "/members/[profile]",
  "/members/[profile]/[next-profile]",
];
export const superAdminNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home variant={"Broken"} size={24} />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Members",
    icon: <UserList size={24} />,
    link: "/members",
  },
  {
    id: 3,
    title: "Settings",
    icon: <Sliders size={28} />,
    children: [
      {
        id: 1,
        title: "Roles",
        icon: <Users size={24} />,
        link: "/roles",
      },
      {
        id: 2,
        title: "Tests",
        icon: <TestTube size={24} />,
        link: "/tests",
      },
      {
        id: 3,
        title: "Subscriptions",
        icon: <Polygon size={24} />,
        link: "/subscriptions",
      },
      {
        id: 4,
        title: "Others",
        icon: <Category2 variant={"Broken"} size={24} color={"gray"} />,
        link: "/others",
      },
    ],
  },
];

export const orgExtraRoutes = ["/members/[profile]"];
export const orgNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={24} />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Members",
    icon: <UserList size={24} />,
    link: "/members",
  },
];

export const adminRoutes = convertToLink(superAdminNavRoutes, [], adminExtraRoute);
export const orgRoutes = convertToLink(orgNavRoutes, [], orgExtraRoutes);
