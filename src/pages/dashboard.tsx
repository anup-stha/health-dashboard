/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/25/22, 2:36 PM
 *
 *
 */

import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { AdminDashboard } from "@/modules/dashboard/AdminDashboard";
import { OrgAdminDashboard } from "@/modules/org-admin/dashboard";
import { withAuth } from "@/shared/hoc/withAuth";

const Dashboard: NextPage = () => {
  const role = useAuthStore.getState().user.role;
  console.log(role);

  return (
    <>
      <NextSeo title="Sunya Health - Dashboard" />

      {role && role.id === 1 ? <AdminDashboard /> : <OrgAdminDashboard />}
    </>
  );
};

export default withAuth(Dashboard);
