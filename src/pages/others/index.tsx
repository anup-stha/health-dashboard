/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 11:59 AM
 *
 *
 */

import type { NextPage } from "next";
import { MainLayout } from "@/layout/MainLayout";
import { OthersPage } from "@/modules/others";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import React from "react";
import { MainHead } from "@/layout/MainHead";

const others: NextPage = () => {
  return (
    <>
      <MainHead title={`Other Fields`} />
      <MainLayout>
        <OthersPage />
      </MainLayout>
    </>
  );
};

export default withAuth(withRole(others));
