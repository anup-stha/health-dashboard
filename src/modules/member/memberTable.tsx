import { TableView } from "@/components/Table";
import { memberStore } from "./memberStore";
import { MemberTableRow } from "./memberTableRow";

export const OrgTable = () => {
  const { memberList, loading } = memberStore();

  return (
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
