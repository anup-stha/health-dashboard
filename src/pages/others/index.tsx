/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 9:18 PM
 *
 *
 */

import type { NextPage } from "next";
import React from "react";

import { MainHead } from "@/layout/MainHead";
import { OthersPage } from "@/modules/others";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const others: NextPage = () => {
  return (
    <>
      <MainHead title="Other Fields" />

      <OthersPage />
    </>
  );
};

export default withAuth(withRole(others));
