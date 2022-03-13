/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/25/22, 8:21 AM
 *
 *
 */

import { useRouter } from "next/router";
import { WarningOctagon } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";

import { toastAlert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { BooleanTag } from "@/components/others/BooleanTag";
import { RoleGridLoadingState } from "@/components/state/rolePageLoadingState";

import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { ChildRolesQuery } from "@/modules/roles/hooks/ChildRolesQuery";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { useRoleList } from "@/services/requests/roleRequests";

export const RoleAccessSection = () => {
  const roleList = useRoleStore((state) => state.roleList);
  const { isLoading } = useRoleList();

  const router = useRouter();
  const { mutateAsync: assignMutateAsync } = ChildRolesQuery.useAssign();
  const { mutateAsync: deleteMutateAsync } = ChildRolesQuery.useRemove();
  const { control, watch } = useForm();
  const selectedRole = roleList.find((role) => role.id === Number(router.query.id));

  const role_access_id = watch("role_access");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-primary_gray-900">Role Access</h1>
          <p className="text-lg font-medium text-primary_gray-500">
            Choose a role to give access of that to role to current role.
          </p>
        </div>
        <div className="flex items-stretch space-x-4">
          <div className="w-72">
            <DropdownController
              name="role_access"
              label=""
              control={control}
              options={roleList
                .map(
                  (role) =>
                    selectedRole &&
                    !selectedRole.role_access.some((accessRole) => accessRole.slug === role.slug) && {
                      label: role.name,
                      value: role.id,
                    }
                )
                .filter(Boolean)}
            />
          </div>
          <Button
            onClick={() =>
              toastAlert({
                type: "promise",
                promise: assignMutateAsync([
                  {
                    p_role_id: Number(router.query.id),
                    c_role_id: role_access_id,
                  },
                ]),
                msgs: {
                  loading: "Assigning Role",
                  success: "Role Assigned",
                },
                id: "assign-role",
              })
            }
          >
            Assign Role
          </Button>
        </div>
      </div>

      {!selectedRole || isLoading ? (
        <RoleGridLoadingState count={1} />
      ) : selectedRole.role_access.length === 0 ? (
        <div className="print:hidden flex items-center text-red-500 space-x-4">
          <WarningOctagon size={40} />
          <span className="font-medium text-xl">No Role Found. Please assign role.</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {selectedRole.role_access.map((role) => (
            <div
              key={role.id}
              className="relative flex flex-col items-start justify-between overflow-hidden h-56 bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200"
            >
              <div className="space-y-2 w-full">
                <div className="flex flex-col justify-between w-full space-y-1">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-3xl font-medium text-primary_gray-800 capitalize">{role.name}</h1>
                    <h1 className="whitespace-nowrap text-base">
                      <BooleanTag type="info" trueStatement={`Slug: ${role.slug}`} />
                    </h1>
                  </div>
                </div>

                <p className="text-lg font-medium text-primary_gray-500 w-4/5 line-clamp-2">
                  {roleList[0].desc} {/** 92 CHARS */}
                </p>
              </div>
              <DeleteModal
                onDelete={() =>
                  toastAlert({
                    type: "promise",
                    promise: deleteMutateAsync({
                      p_role_id: Number(router.query.id),
                      c_role_id: role.id,
                    }),
                    msgs: {
                      loading: "Removing Role",
                      success: "Role Removed",
                    },
                    id: "assign-role",
                  })
                }
                title="You are about to remove access of this role."
                subTitles={["Please be careful. If you remove, this role will lose access to every thing."]}
                disabled={false}
                closeButton={
                  <Button size="sm" color="error">
                    Remove Role
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
