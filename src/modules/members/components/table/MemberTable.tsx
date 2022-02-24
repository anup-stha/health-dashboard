/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/24/22, 2:04 PM
 *
 *
 */

import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { ErrorState } from "@/components/Error";
import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberTableRow } from "@/modules/members/components/table/MemberTableRow";
import { useMemberList } from "@/modules/members/hooks/query/useMemberList";
import { useNestedMemberList } from "@/modules/members/hooks/query/useNestedMemberList";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";

/**
 *
 * @constructor
 */
export default function MemberTable() {
  const router = useRouter();
  const currentRole = useCurrentMemberStore((state) => state.role);

  const user = useAuthStore.getState().user;

  const { data, isLoading } = useMemberList(
    Number(currentRole.id),
    undefined,
    Number(router.query.page ?? 1),
    user.id === 1
  );
  const { data: usersList } = useNestedMemberList(
    currentRole.id,
    useAuthStore.getState().user.member_id ?? 1,
    undefined,
    Number(router.query.page ?? 1),
    user.id !== 1
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [router.query.page]);

  return !currentRole || data?.list.length === 0 ? (
    <ErrorState
      title="No Member Found"
      subtitle="Please switch role or add a new member"
    />
  ) : (
    <>
      {user.id === 1 ? (
        data && (
          <TableView
            data={data.list}
            tableHeadings={[
              "Member Name",
              "Member Code",
              "Verified",
              "Phone Number",
              "Address",
              "",
            ]}
            loading={isLoading}
            searchTerms={["name", "member_code"]}
            tableRowComponent={<MemberTableRow />}
            paginate={true}
            paginateObject={data.pagination}
          />
        )
      ) : usersList ? (
        <TableView
          data={usersList.list}
          tableHeadings={[
            "Member Name",
            "Member Code",
            "Verified",
            "Phone Number",
            "Address",
            "",
          ]}
          loading={isLoading}
          searchTerms={["name", "member_code"]}
          tableRowComponent={<MemberTableRow />}
          paginate={true}
          paginateObject={usersList.pagination}
        />
      ) : (
        <Loader />
      )}
    </>
  );
}
