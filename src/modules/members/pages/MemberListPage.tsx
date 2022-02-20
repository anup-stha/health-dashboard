/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:54 AM
 *
 *
 */

import React from "react";

import { Heading } from "@/components/Headings";
import { Loader } from "@/components/Loader";

import { MemberRoleDropdown } from "@/modules/members/components/dropdown/MemberRoleDropdown";
import { MemberModal } from "@/modules/members/components/modal/MemberModal";
import { PatientExcelImport } from "@/modules/members/components/others/PatientExcelImport";
import MemberTable from "@/modules/members/components/table/MemberTable";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleList } from "@/services/requests/roleRequests";

/**
 *
 * @constructor
 */
export function MemberListPage() {
  const { isLoading } = useRoleList();
  const currentRole = useCurrentMemberStore((state) => state.role);

  if (isLoading) return <Loader />;

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <Heading
            title="Members"
            subtitle="List of all members in a tabulated view. If not data found, please change role."
          />
          <div className="flex sm:flex-col gap-4">
            <MemberRoleDropdown />
            <MemberModal type="add" selectedRole={currentRole} />
            {currentRole.slug === "patient" && <PatientExcelImport />}
          </div>
        </div>
        <MemberTable />
      </div>
    </div>
  );
}
