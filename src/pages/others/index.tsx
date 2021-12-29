/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 5:10 PM
 *
 *
 */

import type { NextPage } from "next";
import { MainLayout } from "@/layout/MainLayout";
import { OthersPage } from "@/modules/others";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const others: NextPage = () => {
  return (
    <MainLayout>
      <OthersPage />
    </MainLayout>
  );
};

export default withAuth(withRole(others));
