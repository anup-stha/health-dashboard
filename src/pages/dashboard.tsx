/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:38 PM
 *
 *
 */

import { NextPage } from "next";
import { withAuth } from "@/shared/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { AdminDashboard } from "@/modules/dashboard/AdminDashboard";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { OrgAdminDashboard } from "@/modules/org-admin/dashboard";

const Dashboard: NextPage = () => {
  const role = useAuthStore.getState().user.role;

  return <MainLayout>{role.id === 1 ? <AdminDashboard /> : <OrgAdminDashboard />}</MainLayout>;
};

export default withAuth(Dashboard);
