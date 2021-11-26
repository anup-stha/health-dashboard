import { TableView } from "@/components/Table";
import { OrgTableRow } from "./OrgTableRow";
import { useOrgStore } from "./useOrgStore";

export const OrgTable = () => {
  const { orgList, loading } = useOrgStore();

  return (
    <TableView
      data={orgList}
      tableHeadings={[
        "Organization Name",
        "Active",
        "Verified",
        "Phone",
        "Owner Name",
      ]}
      loading={loading}
      tableRowComponent={<OrgTableRow />}
    />
  );
};
