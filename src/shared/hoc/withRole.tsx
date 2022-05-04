/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { adminRoutes, doctorRoutes, orgRoutes } from "@/routes/SideBar/routes";

export const withRole = (WrappedComponent: React.FC) => {
  const RequirePermission = (props: React.Props<any>) => {
    const router = useRouter();

    const role = useAuthStore.getState().user?.role;
    const [rolePermitted, setRolePermitted] = useState(false);

    useEffect(() => {
      if (role) {
        if (role.id === 1 && adminRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else if (role.id === 2 && orgRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else if (role.slug === "school_admin" && orgRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else if (role.slug === "accessor" && doctorRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else {
          router.push("/404");
        }
      }
    }, [router, role, rolePermitted]);

    return rolePermitted ? <WrappedComponent {...props} /> : <div />;
  };
  return RequirePermission;
};
