/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/28/22, 10:13 AM
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

  return !currentRole ? (
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
