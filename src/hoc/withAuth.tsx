import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";

const withAuth = (WrappedComponent: React.FC) => {
  const RequireAuthentication = (props: React.Props<any>) => {
    const storeAccessToken = useTokenStore.getState().accessToken;
    const [isAuthenticated, setIsAuthenticated] = useState(!!storeAccessToken);
    const router = useRouter();

    useEffect(() => {
      setIsAuthenticated(!!storeAccessToken);
      return useTokenStore.subscribe(
        () => {
          router.push(`/`);
        },
        (s) => s.refreshToken
      );
    }, [storeAccessToken]);

    useEffect(() => {
      if (!isAuthenticated) router.push(`/`);
    }, [isAuthenticated]);

    return storeAccessToken ? (
      <WrappedComponent {...props} />
    ) : (
      <div>Loading</div>
    );
  };
  return RequireAuthentication;
};

export default withAuth;
