/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/23/22, 10:09 AM
 *
 *
 */

import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { toastAlert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { BooleanTag } from "@/components/others/BooleanTag";

import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { ChildRolesQuery } from "@/modules/roles/hooks/ChildRolesQuery";
import { useRoleStore } from "@/modules/roles/useRoleStore";

export const RoleAccessSection = () => {
  const roleList = useRoleStore((state) => state.allRoleList);
  const router = useRouter();
  const { mutateAsync } = ChildRolesQuery.useAssign();
  const { control, watch } = useForm();

  const role_access_id = watch("role_access");
  console.log(
    roleList.data.map(
      (role) =>
        role.id !== Number(router.query.id) && {
          label: role.name,
          value: role.id,
        }
    )
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Role Access</h1>
          <p className="text-lg font-semibold text-gray-500">
            Choose a role to give access of that to role to current role.
          </p>
        </div>
        <div className="flex items-stretch space-x-4">
          <div className="w-72">
            <DropdownController
              name="role_access"
              label=""
              control={control}
              options={roleList.data
                .map(
                  (role) =>
                    role.id !== Number(router.query.id) && {
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
                promise: mutateAsync([
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
      <div className="grid grid-cols-3">
        <div className="relative flex flex-col items-start justify-between overflow-hidden h-64 bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200">
          <div className="space-y-2 w-full">
            <div className="flex flex-col justify-between w-full space-y-1">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize">
                  {roleList.data[0].name}
                </h1>
                <h1 className="whitespace-nowrap text-base">
                  <BooleanTag
                    type="info"
                    trueStatement={`Slug: ${roleList.data[0].slug}`}
                  />
                </h1>
              </div>

              <div className="self-start text-lg text-gray-500 font-normal">
                Member Limit: {roleList.data[0].member_limit} | Permissions:{" "}
                {roleList.data[0].permissions.length} |{" "}
                {roleList.data[0].public ? "Public" : "Not Public"}
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-500 w-4/5 line-clamp-2">
              {roleList.data[0].desc} {/** 92 CHARS */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
