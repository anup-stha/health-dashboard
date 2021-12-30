/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 11:02 AM
 *
 *
 */

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { getGlobalStates } from "@/services/requests/globalRequests";
import { useGlobalState } from "@/modules/useGlobalState";

export const withAuth = (WrappedComponent: React.FC) => {
  const RequireAuthentication = (props: React.Props<any>) => {
    const accessToken = useAuthStore.getState().token;
    const [globalLoading, setGlobalLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const data = useGlobalState();
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

    useEffect(() => {
      const getGlobalState = async () => {
        setGlobalLoading(true);

        await getGlobalStates()
          .then(() => setGlobalLoading(false))
          .catch(() => setGlobalLoading(false));
      };

      isAuthenticated &&
        Object.keys(data.base).length === 0 &&
        getGlobalState();
    }, [router]);

    return accessToken && !globalLoading ? (
      <WrappedComponent {...props} />
    ) : (
      <div></div>
    );
  };
  return RequireAuthentication;
};
