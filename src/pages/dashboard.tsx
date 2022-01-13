/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/12/22, 8:04 PM
 *
 *
 */

import { NextPage } from "next";
import { withAuth } from "@/shared/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { AdminDashboard } from "@/modules/dashboard/AdminDashboard";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { OrgAdminDashboard } from "@/modules/org-admin/dashboard";
import { NextSeo } from "next-seo";

const Dashboard: NextPage = () => {
  const role = useAuthStore.getState().user.role;

  return (
    <>
      <NextSeo title={"Sunya Health - Dashboard"} />
      <MainLayout>
        {role.id === 1 ? <AdminDashboard /> : <OrgAdminDashboard />}
      </MainLayout>
    </>
  );
};

export default withAuth(Dashboard);
