/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/24/22, 8:44 PM
 *
 *
 */

import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Heading } from "@/components/Headings";
import { PermissionPageLoadingState } from "@/components/state/PermissionLoadingState";

import { MainHead } from "@/layout/MainHead";
import { Permissions } from "@/modules/permissions";
import { DeleteZone } from "@/modules/roles/others/DeleteZone";
import { RoleMemberCategory } from "@/modules/roles/others/roleMemberCategory";
import { UpdateZone } from "@/modules/roles/others/UpdateZone";
import { RoleAccessSection } from "@/modules/roles/RoleAccessSection";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { getAllPermissions, getRoleDetails, useRoleList } from "@/services/requests/roleRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const RoleDetailPage = () => {
  const router = useRouter();
  const idX = router.query.id;

  const { isLoading } = useRoleList();

  const { loading, roleList, setLoading, setSelectedRole, selectedRole, setSelectedPermission } = useRoleStore();

  useEffect(() => {
    if (!idX) {
      return;
    }

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
        .catch((error) => {
          console.warn(error);
        });
    };
    const listAllPermissions = async () => {
      await getAllPermissions()
        .then((response) => setSelectedPermission({ all: response.data.data }))
        .catch((error) => {
          console.warn(error);
        });
    };
    listAllPermissions();
    idX && getRoleDetail();
  }, [idX]);

  return (
    <>
      <MainHead title={`Roles - ${router.query.slug}`} />
      {loading === false && !isLoading ? (
        <div className="px-10 py-10 overflow-visible sm:p-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-end space-x-2 ">
              <Heading
                title={selectedRole && roleList.filter((role) => role.id === Number(idX))[0].name}
                subtitle={selectedRole && roleList.filter((role) => role.id === Number(idX))[0].slug}
              />
            </div>

            <hr className="border-t-[1px] border-primary_gray-300" />
            <RoleAccessSection />
            <hr className="border-t-[1px] border-primary_gray-300" />
            <Permissions />
            <hr className="border-t-[1px] border-primary_gray-300" />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-medium text-primary_gray-900">Alert Zone</h1>
                <p className="text-lg font-medium text-primary_gray-500">Please be careful with anything you do here</p>
              </div>{" "}
              <RoleMemberCategory />
              <UpdateZone idX={idX} />
              <DeleteZone />
            </div>
            <hr className="border-t-[1px] border-primary_gray-200" />
          </div>
        </div>
      ) : (
        <PermissionPageLoadingState count={1} />
      )}
    </>
  );
};

export default withAuth(withRole(RoleDetailPage));

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
