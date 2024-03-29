/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { ErrorState } from "@/components/Error";
import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberFilter } from "@/modules/members/components/filter/MemberFilter";
import { MemberTableRow } from "@/modules/members/components/table/MemberTableRow";
import { useNestedMemberList } from "@/modules/members/hooks/query/useNestedMemberList";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleDetails } from "@/services/requests/roleRequests";

/**
 *
 * @constructor
 */
export default function MemberTable() {
  const router = useRouter();
  const currentRole = useCurrentMemberStore((state) => state.role);
  const { data: roleData } = useRoleDetails(currentRole.id);

  const [filterParams, setFilterParams] = useState("");

  const user = useAuthStore.getState().user;

  const { data: usersList, isLoading } = useNestedMemberList(
    currentRole.id,
    user?.id ?? 1,
    undefined,
    Number(router.query.page ?? 1),
    true,
    filterParams
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [router.query.page]);

  return !currentRole ? (
    <ErrorState title="No Member Found" subtitle="Please switch role or add a new member" />
  ) : (
    <>
      {usersList && roleData ? (
        <TableView
          data={usersList.list}
          tableHeadings={["Member Name", "Member Code", "Verified", "Phone Number", "Address", ""]}
          filterComponent={<MemberFilter role={roleData.data.data} setFilterParams={setFilterParams} />}
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
