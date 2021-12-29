/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 11:21 AM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { adminRoutes, orgRoutes } from "@/routes/SideBar/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const withRole = (WrappedComponent: React.FC) => {
  const RequirePermission = (props: React.Props<any>) => {
    const router = useRouter();

    const role = useAuthStore.getState().user.role;
    const [rolePermitted, setRolePermitted] = useState(false);

    useEffect(() => {
      if (role) {
        if (role.id === 1 && adminRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else if (role.id === 2 && orgRoutes.includes(router.pathname)) {
          setRolePermitted(true);
        } else {
          router.push("/404");
        }
      }
    }, [router, role, rolePermitted]);
    return rolePermitted ? <WrappedComponent {...props} /> : <div></div>;
  };
  return RequirePermission;
};
