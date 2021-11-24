import { Buildings, ChartLineUp, HouseSimple, Users } from "phosphor-react";

export const OrganisationNavRoutes = [
  {
    title: "Dashboard",
    icon: <HouseSimple />,
    state: "active",
    link: "/dashboard",
  },
  {
    title: "Statistics",
    icon: <ChartLineUp />,
    state: "inactive",
    link: "/stats",
  },
  {
    title: "Organisation",
    icon: <Buildings />,
    state: "inactive",
    link: "/organisations",
  },
  {
    title: "Users",
    icon: <Users />,
    state: "inactive",
    link: "/users",
  },
];
