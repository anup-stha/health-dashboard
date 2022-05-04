/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";

import { NavDropdown } from "./NavDropdown";
import { NavItem } from "./NavItem";
import { doctorNavRoutes, orgNavRoutes, schoolAdminNavRoutes, superAdminNavRoutes } from "./routes";

export const NavBar = () => {
  const role = useAuthStore()?.user?.role;
  const navBarRoutes = role
    ? role.id === 1
      ? superAdminNavRoutes
      : role.id === 2
      ? orgNavRoutes
      : role.slug === "school_admin"
      ? schoolAdminNavRoutes
      : role.slug === "accessor"
      ? doctorNavRoutes
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
                <Modal key={`${route.id}-${route.title}`}>
                  <NavItem route={route} key={`${route.id}-${route.title}`} />;
                </Modal>
              );
            }
          }

          if (route.children) {
            return <NavDropdown subRoutes={route} key={`${route.id}-${route.title}`} />;
          }

          return <NavItem route={route} key={`${route.id}-${route.title}`} />;
        })}
      </ul>
    </div>
  );
};
