/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/9/22, 7:24 PM
 *
 *
 */

import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { useMemberList } from "@/modules/member/api/hooks/useMemberList";
import { TableView } from "@/components/Table";
import { Loader } from "@/components/Loader";
import { MemberTableRow } from "@/modules/member/table/MemberTableRow";

export const MemberTable = () => {
  const router = useRouter();
  const currentRole = useCurrentMemberStore((state) => state.role);

  const { data, isLoading } = useMemberList(
    Number(currentRole.id),
    undefined,
    Number(router.query.page ?? 1)
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [router.query.page]);

  return !currentRole || data?.list.length === 0 ? (
    <div className="flex flex-col justify-start py-32 items-center gap-4">
      <div className="object-contain w-full h-32 relative ">
        <Image
          src="/assets/not-found.svg"
          alt="Empty State"
          layout="fill"
          objectFit="contain"
          priority={true}
        />{" "}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-semibold text-green-600">
          No Member found
        </div>
        <div className="text-lg font-medium text-gray-500">
          Please switch role or add a new member.
        </div>
      </div>
    </div>
  ) : (
    <>
      {data ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};
