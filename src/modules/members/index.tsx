/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/18/22, 4:06 PM
 *
 *
 */

import { MemberModal } from "@/modules/members/modal/MemberModal";
import { MemberTable } from "./table/MemberTable";
import { MemberRoleDropdown } from "./others/MemberRoleDropdown";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { Role } from "@/types";

export const MemberPage = () => {
  const selectedRole = useMemberStore((state) => state.selectedRole) as Role;

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-850">Members</h1>
            <p className="text-lg font-semibold text-gray-500">
              List of all members in a tabulated view. If not data found, please
              change role.
            </p>
          </div>

          <div className="flex space-x-4">
            <MemberRoleDropdown />
            <MemberModal type="add" selectedRole={selectedRole} />
          </div>
        </div>
        <MemberTable />
      </div>
    </div>
  );
};
