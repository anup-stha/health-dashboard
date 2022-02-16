/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 11:27 PM
 *
 *
 */

import { MemberRoleDropdown } from "@/modules/member/others/MemberRoleDropdown";
import { MemberTable } from "@/modules/member/table/MemberTable";
import { MemberModal } from "@/modules/member/modal/MemberModal";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { Heading } from "@/components/Headings";
import React from "react";
import { ExcelImport } from "@/modules/member/excel/ExcelImport";

const MemberListPage = () => {
  const currentRole = useCurrentMemberStore((state) => state.role);

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <Heading
            title="Members"
            subtitle={
              " List of all members in a tabulated view. If not data found, please change role."
            }
          />

          <div className="flex sm:flex-col gap-4">
            <MemberRoleDropdown />
            <MemberModal type="add" selectedRole={currentRole} />
            {currentRole.slug === "patient" && <ExcelImport />}
          </div>
        </div>
        <MemberTable />
      </div>
    </div>
  );
};

export { MemberListPage };
export { ProfileOverviewTab } from "@/modules/member/new/ProfileOverviewTab";
