/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 10:09 PM
 *
 *
 */

import React from "react";

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";

import { MainHead } from "@/layout/MainHead";
import RolePage from "@/modules/roles";
import { useAllRoleList } from "@/modules/roles/hooks/useAllRoleList";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const Roles = () => {
  const { isLoading } = useAllRoleList();

  return (
    <>
      <MainHead title="Roles" />

      {!isLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
    </>
  );
};

export default withAuth(withRole(Roles));
