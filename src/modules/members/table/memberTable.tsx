/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 2:52 PM
 *
 *
 */

import { TableView } from "@/components/Table";
import { memberStore } from "../memberStore";
import { MemberTableRow } from "./memberTableRow";
import Image from "next/image";
import { useMemberList } from "@/services/requests/memberRequests";

export const MemberTable = () => {
  const { memberList, selectedRole } = memberStore();
  const { isLoading } = useMemberList(Number(selectedRole.id));

  return memberList.length === 0 || selectedRole.id === 0 ? (
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
        "Active",
        "Verified",
        "Phone Number",
        "Address",
        "",
      ]}
      loading={isLoading}
      tableRowComponent={<MemberTableRow />}
    />
  );
};
