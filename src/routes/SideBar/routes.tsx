/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/28/22, 11:35 AM
 *
 *
 */

import { Category2, Home } from "iconsax-react";
import { DeviceMobile, Polygon, Question, Sliders, TestTube, UserList, Users } from "phosphor-react";
import React from "react";

import { adminWelcomeSlides } from "@/modules/dashboard/adminWelcomeSlides";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";
import { orgAdminWelcomeSlides } from "@/modules/org-admin/dashboard";

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
  "/subscriptions/[slug]",
  "/members/[profile]",
  "/members/[profile]/invoice",
  "/members/[profile]/[user]",
  "/members/[profile]/[user]/test_report",
];
export const superAdminNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={24} variant="Broken" />,
    link: "/dashboard",
  },
  {
    id: 21,
    title: "Members",
    icon: <UserList size={24} />,
    link: "/members",
  },
  {
    id: 3,
    title: "Settings",
    icon: <Sliders size={24} />,
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
        id: 6,
        title: "App Builds",
        icon: <DeviceMobile size={24} fontSize="duotone" />,
        link: "/app",
      },

      {
        id: 4,
        title: "Others",
        icon: <Category2 variant="Broken" size={24} color="primary_gray" />,
        link: "/others",
      },
      {
        id: 5,
        title: "How To Use",
        icon: <Question size={24} />,
        link: false,
        modal: ({ children }) => <WelcomeModal images={adminWelcomeSlides}> {children}</WelcomeModal>,
      },
    ],
  },
];

export const orgExtraRoutes = ["/members/[profile]", "/members/[profile]/test_report", "/profile/invoice"];
export const orgNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={24} />,
    link: "/dashboard",
  },
  {
    id: 21,
    title: "Members",
    icon: <UserList size={24} />,
    link: "/members",
  },
  {
    id: 3,
    title: "How To Use",
    icon: <Question size={24} />,
    link: false,
    modal: ({ children }) => <WelcomeModal images={orgAdminWelcomeSlides}> {children}</WelcomeModal>,
  },
];

export const adminRoutes = convertToLink(superAdminNavRoutes, [], adminExtraRoute);
export const orgRoutes = convertToLink(orgNavRoutes, [], orgExtraRoutes);
