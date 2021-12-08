import { TableView } from "@/components/Table";
import { RoleMemberCategoryTableRow } from "./RoleMemberCategoryTableRow";
import { useRoleStore } from "../useRoleStore";

export const RoleMemberCategoryTable = () => {
  const { memberCategoryList } = useRoleStore();

  return memberCategoryList.length !== 0 ? (
    <TableView
      loading={false}
      tableHeadings={["name", "slug", "value Type", "Required", ""]}
      data={memberCategoryList}
      tableRowComponent={<RoleMemberCategoryTableRow />}
    />
  ) : null;
};
