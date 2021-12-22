/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { NextPage } from "next";
import withAuth from "@/shared/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { AdminDashboard } from "@/modules/dashboard/AdminDashboard";

const Dashboard: NextPage = () => {
  return (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  );
};

export default withAuth(Dashboard);
