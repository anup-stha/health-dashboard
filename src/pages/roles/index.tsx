/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/12/22, 1:59 PM
 *
 *
 */

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import RolePage from "@/modules/roles";
import { useAllRoleList } from "@/modules/roles/hooks/useAllRoleList";
import React from "react";
import { MainHead } from "@/layout/MainHead";

const Roles = () => {
  const { isLoading } = useAllRoleList();

  return (
    <>
      <MainHead title={`Roles`} />

      <MainLayout>
        {!isLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
      </MainLayout>
    </>
  );
};

export default withAuth(withRole(Roles));
