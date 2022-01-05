/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/5/22, 11:30 AM
 *
 *
 */

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";

export const withAuth = (WrappedComponent: React.FC) => {
  const RequireAuthentication = (props: React.Props<any>) => {
    const accessToken = useAuthStore.getState().token;
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const router = useRouter();

    useEffect(() => {
      setIsAuthenticated(!!accessToken);
      return useAuthStore.subscribe(
        () => {
          router.push(`/`);
        },
        (s: any) => s.token
      );
    }, [router, accessToken]);

    useEffect(() => {
      if (!isAuthenticated) router.push("/");
      if (isAuthenticated && router.pathname === "/") {
        router.push("/dashboard");
      }
    }, [isAuthenticated, router, accessToken]);

    return accessToken ? <WrappedComponent {...props} /> : <div />;
  };
  return RequireAuthentication;
};
