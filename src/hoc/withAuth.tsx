import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../modules/auth/useTokenStore";

const withAuth = (WrappedComponent: React.FC) => {
  const RequireAuthentication = (props: React.Props<any>) => {
    // const storeAccessToken = useTokenStore.getState().accessToken;
    // const [isAuthenticated, setIsAuthenticated] = useState(!!storeAccessToken);
    // const router = useRouter();

    // useEffect(() => {
    //   if (!isAuthenticated) router.push(`/`);
    // }, [isAuthenticated, router]);

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

    return accessToken ? <WrappedComponent {...props} /> : <div>Loading</div>;
  };
  return RequireAuthentication;
};

export default withAuth;
