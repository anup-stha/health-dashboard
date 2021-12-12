/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/12/21, 11:57 AM
 *
 *
 */

import { TableView } from "@/components/Table";
import { memberStore } from "../memberStore";
import { MemberTableRow } from "./memberTableRow";
import Image from "next/image";

export const MemberTable = () => {
  const { memberList, loading } = memberStore();

  return memberList.length === 0 ? (
    <div className="flex justify-center">
      <div className="w-[48vw] h-[70vh] relative">
        <Image
          src="/assets/empty.svg"
          alt="Empty State"
          layout="fill"
          objectFit="cover"
          priority={true}
        />{" "}
      </div>
    </div>
  ) : (
    <TableView
      data={memberList}
      tableHeadings={[
        "Member Name",
        "Can Login",
        "Active Status",
        "Verified Status",
        "Phone Number",
        "Address",
        "",
      ]}
      loading={loading}
      tableRowComponent={<MemberTableRow />}
    />
  );
};
