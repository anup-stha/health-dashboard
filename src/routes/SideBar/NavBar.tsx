/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { NavDropdown } from "./NavDropdown";
import { NavItem } from "./NavItem";
import { orgNavRoutes, superAdminNavRoutes } from "./routes";

export const NavBar = () => {
  const role = useAuthStore().user.role;
  const navBarRoutes = role
    ? role.id === 1
      ? superAdminNavRoutes
      : role.name === "Organization"
      ? orgNavRoutes
      : []
    : [];

  return (
    <div className="w-full text-sm">
      <ul className="flex flex-col w-full gap-y-1">
        {navBarRoutes.map((route) => {
          if (route.children) {
            return (
              <NavDropdown
                subRoutes={route}
                key={`${route.id}-${route.title}`}
              />
            );
          }

          return <NavItem route={route} key={`${route.id}-${route.title}`} />;
        })}
      </ul>
    </div>
  );
};
