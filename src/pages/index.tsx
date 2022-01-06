/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 12:28 PM
 *
 *
 */

import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { LoginPage } from "@/modules/auth/LoginPage";
import { MainHead } from "@/layout/MainHead";

const Home: NextPage = () => {
  const router = useRouter();
  const hasTokens = useAuthStore((s) => !!s.token);

  useEffect(() => {
    hasTokens && router.replace("/dashboard");
  }, [hasTokens, router]);

  return (
    <>
      <MainHead title={"Login"} />
      {!hasTokens ? <LoginPage /> : <div>Loading</div>}{" "}
    </>
  );
};

export default Home;
