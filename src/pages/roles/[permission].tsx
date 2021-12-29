/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:38 PM
 *
 *
 */

import { PermissionPageLoadingState } from "@/components/state/PermissionLoadingState";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { Permissions } from "@/modules/permissions";
import { DeleteZone } from "@/modules/roles/others/DeleteZone";
import { RoleMemberCategory } from "@/modules/roles/others/roleMemberCategory";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import {
  getAllPermissions,
  getRoleDetails,
} from "@/services/requests/roleRequests";
import { useEffect } from "react";
import { UpdateZone } from "@/modules/roles/others/UpdateZone";
import { useRouter } from "next/router";

const RoleDetailPage = () => {
  const router = useRouter();
  const idX = router.query.permission;

  const {
    loading,
    roleList,
    setLoading,
    getRoleListFromServer,
    setSelectedRole,
    selectedRole,
    setSelectedPermission,
    allRoleLoading: allLoading,
    setAllLoading,
  } = useRoleStore();

  useEffect(() => {
    if (!idX) {
      return;
    }

    const listRoles = async () => {
      await getRoleListFromServer()
        .then(() => setAllLoading(false))
        .catch(() => setAllLoading(false));
    };
    const getRoleDetail = async () => {
      setLoading(true);
      await getRoleDetails(Number(idX))
        .then((response) => {
          setSelectedPermission({
            current: response.data.data.permissions,
            initial: response.data.data.permissions,
            selected: [],
            deselected: [],
          });
          setSelectedRole(response.data.data);

          setLoading(false);
        })
        .catch(() => {});
    };
    const listAllPermissions = async () => {
      await getAllPermissions()
        .then((response) => setSelectedPermission({ all: response.data.data }))
        .catch(() => {});
    };
    listRoles();
    listAllPermissions();
    idX && getRoleDetail();
  }, [idX]);

  return (
    <MainLayout>
      {loading === false && allLoading === false && Number(idX) !== 1 ? (
        <div className="px-10 py-10 overflow-visible sm:p-8">
          <div className="flex flex-col space-y-8">
            <div className="flex items-end space-x-2 ">
              <h1 className="text-5xl font-semibold text-gray-900">
                {selectedRole &&
                  roleList.filter((role) => role.id === Number(idX))[0].name}
              </h1>
            </div>

            <hr className="border-t-[1px] border-gray-200" />

            <Permissions />
            <hr className="border-t-[1px] border-gray-200" />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Alert Zone
                </h1>
                <p className="text-lg font-semibold text-gray-500">
                  Please be careful with anything you do here
                </p>
              </div>{" "}
              <RoleMemberCategory />
              <UpdateZone idX={idX} />
              <DeleteZone />
            </div>
            <hr className="border-t-[1px] border-gray-200" />
          </div>
        </div>
      ) : (
        <PermissionPageLoadingState count={1} />
      )}
    </MainLayout>
  );
};

export default withRole(withAuth(RoleDetailPage));

/*
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      idX: context.query.permission,
    },
  };
};
*/
