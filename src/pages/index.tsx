/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 1:24 PM
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
    hasTokens && router.push("/dashboard");
  }, [hasTokens, router]);

  return !hasTokens ? <LoginPage /> : <div />;
};

export default Home;
