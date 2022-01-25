/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 6:47 PM
 *
 *
 */

import React, { useEffect } from "react";
import { MemberRoleDropdown } from "@/modules/member/others/MemberRoleDropdown";
import { useCurrentMemberStore } from "@/modules/member/useCurrentMemberStore";
import { useRoleListBySlug } from "@/modules/roles/hooks/useRoleListBySlug";
import { useNestedMemberList } from "@/modules/member/api/hooks/useNestedMemberList";
import { useRouter } from "next/router";
import { WarningOctagon } from "phosphor-react";
import { TableView } from "@/components/Table";
import { Loader } from "@/components/Loader";
import { UserTableRow } from "@/modules/member/UserTableRow";
import { ProfileListLoadingState } from "@/components/state/ProfileSubsLoadingState";

export const UsersTable = () => {
  const router = useRouter();
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const currentMember = useCurrentMemberStore((state) => state.member);

  const userRole = useCurrentMemberStore((state) => state.userRole);
  const setUserRole = useCurrentMemberStore(
    (state) => state.setCurrentUserRole
  );

  const { data } = useRoleListBySlug(selectedRole.slug);

  useEffect(() => {
    data?.data && setUserRole(data?.data.data[0]);
  }, [data?.data]);

  const { data: usersList } = useNestedMemberList(
    userRole ? Number(userRole.id) : 0,
    currentMember.id,
    undefined,
    Number(router.query.page ?? 1)
  );

  return data ? (
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
          roleList={data.data.data}
          selectedRole={userRole}
          setSelectedRole={setUserRole}
        />
      </div>
      {usersList ? (
        usersList.data.data.list.length === 0 ? (
          <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
            <WarningOctagon size={24} /> <span>No Details Found</span>
          </div>
        ) : (
          <TableView
            data={usersList?.data.data.list.map((element) => ({
              ...element,
              role_id: selectedRole.id,
              role_slug: selectedRole.slug,
            }))}
            tableHeadings={[
              "Member Name",
              "Code",
              "Phone Number",
              "Address",
              "",
            ]}
            searchTerms={["name", "member_code"]}
            tableRowComponent={<UserTableRow />}
            loading={!data.data}
            paginate={true}
            paginateObject={usersList.data.data.pagination}
          />
        )
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    <ProfileListLoadingState />
  );
};
