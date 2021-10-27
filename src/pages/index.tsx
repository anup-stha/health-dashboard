import { LoginPage } from "@/modules/auth/LoginPage";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const hasTokens = useTokenStore(
    (s: any) => !!(s.accessToken && s.refreshToken)
  );

  React.useEffect(() => {
    hasTokens && router.push("/dashboard");
  }, [hasTokens, router]);

  return !hasTokens ? <LoginPage /> : <div>Loading</div>;
};

export default Home;
