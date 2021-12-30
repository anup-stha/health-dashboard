/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 6:45 PM
 *
 *
 */

import { RolePageLoadingState } from "@/components/state/rolePageLoadingState";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import RolePage from "@/modules/roles";
import { useAllRoleList } from "@/modules/roles/hooks/useAllRoleList";

const Roles = () => {
  const { isLoading } = useAllRoleList();

  return (
    <MainLayout>
      {!isLoading ? <RolePage /> : <RolePageLoadingState count={1} />}
    </MainLayout>
  );
};

export default withRole(withAuth(Roles));
