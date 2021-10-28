import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";

const withAuth = (WrappedComponent: React.FC) => {
  const RequireAuthentication = (props: React.ComponentProps<any>) => {
    const store = useTokenStore.getState().accessToken;
    const [isAuthenticated, setIsAuthenticated] = useState(!!store);
    const router = useRouter();

    useEffect(() => {
      console.log(store);
      setIsAuthenticated(!!store);
      return useTokenStore.subscribe(
        () => {
          router.push(`/`);
        },
        (s) => s.refreshToken
      );
    }, [store]);

    useEffect(() => {
      if (!isAuthenticated) router.push(`/`);
    }, [isAuthenticated]);

    return store ? <WrappedComponent {...props} /> : <div>Loading</div>;
  };
  return RequireAuthentication;
};

export default withAuth;
