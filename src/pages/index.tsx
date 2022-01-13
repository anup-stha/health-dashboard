/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 1:06 PM
 *
 *
 */

import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { LoginPage } from "@/modules/auth/LoginPage";
import { MainHead } from "@/layout/MainHead";
import { MainLoader } from "@/components/Loader";

const Home: NextPage = () => {
  const router = useRouter();
  const hasTokens = useAuthStore((s) => !!s.token);
  const [routerLoading, setRouterLoading] = useState(true);

  useEffect(() => {
    hasTokens
      ? router.replace("/dashboard").then(() => {
          setRouterLoading(false);
        })
      : setRouterLoading(false);
  }, [hasTokens, router]);

  if (routerLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <MainHead title={"Login"} />
      <LoginPage />
    </>
  );
};

export default Home;
