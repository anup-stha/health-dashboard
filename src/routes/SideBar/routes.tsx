import { Buildings, HouseSimple, Sliders, Users } from "phosphor-react";

export const AdminNavRoutes = [
  {
    title: "Dashboard",
    icon: <HouseSimple />,
    state: "active",
    link: "/dashboard",
  },
  // {
  //   title: "Statistics",
  //   icon: <ChartLineUp />,
  //   state: "inactive",
  //   link: "/stats",
  // },
  {
    title: "Organisation",
    icon: <Buildings />,
    state: "inactive",
    link: "/organisations",
  },
  {
    title: "Settings",
    icon: <Sliders />,
    sublinks: [
      {
        title: "Roles",
        state: "inactive",
        icon: <Users />,
        link: "/roles",
        asPath: "/roles/permissions",
      },
    ],
  },
];
