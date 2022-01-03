/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/3/22, 10:32 AM
 *
 *
 */

import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { LoginPage } from "@/modules/auth/LoginPage";

const Home: NextPage = () => {
  const router = useRouter();
  const hasTokens = useAuthStore((s) => !!s.token);

  useEffect(() => {
    hasTokens && router.replace("/dashboard");
  }, [hasTokens, router]);

  return !hasTokens ? <LoginPage /> : <div>Loading</div>;
};

export default Home;
