/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/7/22, 9:45 AM
 *
 *
 */

import { TableView } from "@/components/Table";
import { useMemberStore } from "../useMemberStore";
import { MemberTableRow } from "./MemberTableRow";
import Image from "next/image";
import { useMembersList } from "@/modules/members/api/hooks/useMembersList";
import React, { useState } from "react";

export const MemberTable = () => {
  const memberList = useMemberStore((state) => state.memberList);
  const { selectedRole } = useMemberStore();
  const [pageIndex] = useState(1);
  const { isLoading, data } = useMembersList(
    Number(selectedRole.id),
    undefined,
    pageIndex
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
        />
      )}
      {/*   <div className="">
        <Pagination
          totalPageNumber={pagination.total_pages + 2}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          isPreviousData={isPreviousData}
          data={data}
        />
      </div> */}
    </>
  );
};
