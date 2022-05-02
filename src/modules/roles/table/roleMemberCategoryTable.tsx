/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
