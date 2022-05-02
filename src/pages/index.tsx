/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { MainLoader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { LoginPage } from "@/modules/auth/LoginPage";
import { useAuthStore } from "@/modules/auth/useTokenStore";

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

    return () => setRouterLoading(false);
  }, [hasTokens, router]);

  if (routerLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <MainHead title="Login" />
      <LoginPage />
    </>
  );
};

export default Home;
