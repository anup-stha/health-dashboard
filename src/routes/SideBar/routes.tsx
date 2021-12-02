import { Buildings, HouseSimple, Sliders, Users } from "phosphor-react";
import React from "react";

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

const adminExtraRoute = ["/roles/[permission]"];
export const superAdminNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <HouseSimple size={24} />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Organisation",
    icon: <Buildings size={24} />,
    link: "/organisations",
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
    ],
  },
];

export const orgExtraRoutes = [];
export const orgNavRoutes: RouteObjectType[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <HouseSimple size={24} />,
    link: "/dashboard",
  },
];

export const adminRoutes = convertToLink(
  superAdminNavRoutes,
  [],
  adminExtraRoute
);
export const orgRoutes = convertToLink(orgNavRoutes, [], orgExtraRoutes);
