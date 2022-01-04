/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 2:06 PM
 *
 *
 */

import { TableView } from "@/components/Table";
import { useMemberStore } from "../useMemberStore";
import { MemberTableRow } from "./memberTableRow";
import Image from "next/image";
import { useMembersList } from "@/modules/members/api/hooks/useMembersList";
import { Loader } from "@/components/Loader";

export const MemberTable = () => {
  const { memberList, selectedRole } = useMemberStore();
  const { isLoading } = useMembersList(Number(selectedRole.id));

  return isLoading ? (
    <Loader />
  ) : memberList.length === 0 || selectedRole.id === 0 ? (
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
      tableRowComponent={<MemberTableRow />}
    />
  );
};
