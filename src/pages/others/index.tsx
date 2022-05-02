/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
