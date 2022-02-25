/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/24/22, 2:25 PM
 *
 *
 */

import React from "react";

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";

import { MainHead } from "@/layout/MainHead";
import RolePage from "@/modules/roles";
import { useRoleList } from "@/services/requests/roleRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const Roles = () => {
  const { isLoading } = useRoleList();

  return (
    <>
      <MainHead title="Roles" />

      {!isLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
    </>
  );
};

export default withAuth(withRole(Roles));
