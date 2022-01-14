/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 4:54 PM
 *
 *
 */

import { TableView } from "@/components/Table";
import { useMemberStore } from "../useMemberStore";
import { MemberTableRow } from "./MemberTableRow";
import Image from "next/image";
import { useMembersList } from "@/modules/members/api/hooks/useMembersList";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";

export const MemberTable = () => {
  const router = useRouter();
  const memberList = useMemberStore((state) => state.memberList);
  const memberPagination = useMemberStore((state) => state.pagination);

  const { selectedRole } = useMemberStore();
  const { data, isFetching } = useMembersList(
    Number(selectedRole.id),
    undefined,
    Number(router.query.page ?? 1)
  );

  useEffect(() => {
    data && useMemberStore.getState().setMemberList(data?.data);
  }, [isFetching]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [router.query.page]);

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
      {data?.data.data ? (
        <TableView
          data={memberList}
          tableHeadings={[
            "Member Name",
            "Member Code",
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
      ) : (
        <Loader />
      )}
    </>
  );
};
