/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

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
