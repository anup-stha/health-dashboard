import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoginPage } from "@/modules/auth/LoginPage";
import { useAuthStore } from "@/modules/auth/useTokenStore";

const Home: NextPage = () => {
  const router = useRouter();
  const hasTokens = useAuthStore((s) => !!s.token);

  useEffect(() => {
    hasTokens && router.push("/dashboard");
  }, [hasTokens, router]);

  return !hasTokens ? <LoginPage /> : <div>loading</div>;
};

export default Home;
