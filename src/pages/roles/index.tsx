/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";
import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import RolePage from "@/modules/roles";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { useEffect } from "react";

const Roles = () => {
  const {
    getRoleListFromServer,
    setAllLoading,
    allRoleLoading: allLoading,
  } = useRoleStore();

  useEffect(() => {
    const listRoles = async () => {
      await getRoleListFromServer()
        .then(() => setAllLoading(false))
        .catch(() => setAllLoading(false));
    };
    listRoles();
  }, []);

  return (
    <MainLayout>
      {!allLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
    </MainLayout>
  );
};

export default withRole(withAuth(Roles));
