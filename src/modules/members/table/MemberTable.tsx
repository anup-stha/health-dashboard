/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 3:20 PM
 *
 *
 */

import { TableView } from "@/components/Table";
import { useMemberStore } from "../useMemberStore";
import { MemberTableRow } from "./MemberTableRow";
import Image from "next/image";
import { useMembersList } from "@/modules/members/api/hooks/useMembersList";
import React from "react";
import { useRouter } from "next/router";

export const MemberTable = () => {
  const router = useRouter();
  const memberList = useMemberStore((state) => state.memberList);
  const memberPagination = useMemberStore((state) => state.pagination);

  const { selectedRole } = useMemberStore();
  const { isLoading, data } = useMembersList(
    Number(selectedRole.id),
    undefined,
    Number(router.query.page ?? 1)
  );

  return selectedRole.id === 0 ? (
    <div className="flex justify-center">
      <div className="w-[48vw] h-[70vh] md:w-full md:h-[50vh] relative">
        <Image
          src="/assets/empty.svg"
          alt="Empty State"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
    </div>
  ) : (
    <>
      {data?.data.data && (
        <TableView
          loading={isLoading}
          data={memberList}
          tableHeadings={[
            "Member Name",
            "Member Code",
            "Active",
            "Verified",
            "Phone Number",
            "Address",
            "",
          ]}
          searchTerms={["name", "member_code"]}
          tableRowComponent={<MemberTableRow />}
          paginate={true}
          paginateObject={memberPagination}
        />
      )}
    </>
  );
};
