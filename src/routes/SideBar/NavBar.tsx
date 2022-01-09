/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/9/22, 6:37 PM
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
      : role.id === 2
      ? orgNavRoutes
      : []
    : [];

  return (
    <div className="w-full text-sm">
      <ul className="flex flex-col w-full gap-y-1">
        {navBarRoutes.map((route) => {
          if (route.link === false) {
            if (route.modal) {
              const Modal = route.modal;

              return (
                <Modal>
                  <NavItem route={route} key={`${route.id}-${route.title}`} />;
                </Modal>
              );
            }
          }

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
