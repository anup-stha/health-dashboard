/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/27/21, 4:59 PM
 *
 *
 */

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";
import withAuth from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import RolePage from "@/modules/roles";
import { useRoleList } from "@/services/requests/roleRequests";

const Roles = () => {
  const { isLoading } = useRoleList();

  return (
    <MainLayout>
      {!isLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
    </MainLayout>
  );
};

export default withRole(withAuth(Roles));
