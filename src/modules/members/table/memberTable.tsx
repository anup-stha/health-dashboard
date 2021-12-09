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
