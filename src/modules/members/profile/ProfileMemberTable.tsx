/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/6/22, 2:13 PM
 *
 *
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MemberRoleDropdown } from "@/modules/members/others/MemberRoleDropdown";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { useNestedMemberList } from "@/modules/members/api/hooks/useNestedMemberList";
import { TableView } from "@/components/Table";
import { MemberTableRow } from "@/modules/members/table/MemberTableRow";
import { WarningOctagon } from "phosphor-react";
import { useRoleListBySlug } from "@/modules/roles/hooks/useRoleListBySlug";

export const ProfileMemberTable: React.FC = () => {
  const router = useRouter();

  const { isLoading: roleListBySlugLoading } = useRoleListBySlug(
    !Array.isArray(router.query.profile) && router.query.profile
      ? router.query.profile
      : ""
  );

  const roleList = useRoleStore((state) => state.roleListBySlug.data);
  const [selectedRole, setSelectedRole] = useState(roleList[0]);

  const { data, isLoading } = useNestedMemberList(
    selectedRole
      ? Number(selectedRole.id)
      : roleList.length !== 0
      ? Number(roleList[0].id)
      : 0,
    Number(router.query.id)
  );

  useEffect(() => {
    setSelectedRole(roleList[0]);
  }, [roleList, router]);

  if (isLoading || !selectedRole || roleListBySlugLoading) return <div />;

  return (
    <div className="print:hidden w-full bg-white rounded-xl sm:w-full  ring-1 ring-black ring-opacity-10 p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="print:hidden">
          <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
            Organization Member List
          </h1>
          <h1 className="text-gray-500 font-medium text-lg print:hidden">
            List of All Organization Members Added by Organization Admin and
            Organization Operators
          </h1>
        </div>
        <MemberRoleDropdown
          roleList={roleList}
          selectedRole={selectedRole ?? roleList[0]}
          setSelectedRole={setSelectedRole}
        />
      </div>
      {data &&
        (data.data.data.list.length === 0 ? (
          <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
            <WarningOctagon size={24} /> <span>No Details Found</span>
          </div>
        ) : (
          <TableView
            data={data?.data.data.list.map((element) => ({
              ...element,
              role_id: selectedRole.id,
              role_slug: selectedRole.slug,
            }))}
            tableHeadings={[
              "Member Name",
              "Code",
              "Active",
              "Verified",
              "Phone Number",
              "Address",
              "",
            ]}
            searchTerms={["name", "member_code"]}
            tableRowComponent={<MemberTableRow />}
            loading={isLoading}
          />
        ))}
    </div>
  );
};
