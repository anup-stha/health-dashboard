import { Table } from "@/components/Table/Table";
import { OrgCard, OrgTableRow } from "./OrgTableRow";
import { useOrgStore } from "./useOrgStore";

export const OrgTable = () => {
  const { orgList, loading } = useOrgStore();

  return (
    <Table
      data={orgList}
      tableHeadings={[
        "Organisation Name",
        "Active Status",
        "Verified",
        "Added Date",
        "Owner",
      ]}
      loading={loading}
      tableRowComponent={<OrgTableRow />}
      tableMobileViewComponent={<OrgCard />}
    />
  );
};
