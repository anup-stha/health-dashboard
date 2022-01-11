/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 4:01 PM
 *
 *
 */

import {
  Polygon,
  Question,
  Sliders,
  TestTube,
  UserList,
  Users,
} from "phosphor-react";
import React from "react";
import { Category2, Home } from "iconsax-react";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";
import { orgAdminWelcomeSlides } from "@/modules/org-admin/dashboard";
import { adminWelcomeSlides } from "@/modules/dashboard/adminWelcomeSlides";

const convertToLink = (
  json: RouteObjectType[],
  ansArray: string[],
  extra?: string[]
) => {
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
      link?: string | false;
      children?: never;
      modal?: React.FC;
    }
  | {
      id: number | string;
      title: string;
      icon: React.ReactNode;
      link?: never;
      children?: RouteObjectType[];
    };

const adminExtraRoute = [
  "/roles/[slug]",
  "/tests/[test]",
  "/members/[profile]",
  "/members/[profile]/[next-profile]",
  "/subscriptions/[slug]",
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
      {
        id: 5,
        title: "How To Use",
        icon: <Question size={24} />,
        link: false,
        modal: ({ children }) => (
          <WelcomeModal images={adminWelcomeSlides}> {children}</WelcomeModal>
        ),
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
  {
    id: 3,
    title: "How To Use",
    icon: <Question size={24} />,
    link: false,
    modal: ({ children }) => (
      <WelcomeModal images={orgAdminWelcomeSlides}> {children}</WelcomeModal>
    ),
  },
];

export const adminRoutes = convertToLink(
  superAdminNavRoutes,
  [],
  adminExtraRoute
);
export const orgRoutes = convertToLink(orgNavRoutes, [], orgExtraRoutes);
