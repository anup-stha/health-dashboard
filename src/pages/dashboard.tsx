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
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useEffect } from "react";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { listRole } from "@/services/requests/roleRequests";

const Dashboard: NextPage = () => {
  const role = useAuthStore().user.role;

  useEffect(() => {
    const getRoles = async () => {
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
        })
        .catch(() => {});
    };
    useRoleStore.getState().roleList.length === 0 && getRoles();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center h-[80vh] justify-center text-5xl font-bold">
        You have {role && role.name} access
      </div>
    </MainLayout>
  );
};

export default withAuth(Dashboard);
