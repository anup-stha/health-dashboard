/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/1/22, 4:47 PM
 *
 *
 */

import { MemberRoleDropdown } from "@/modules/member/others/MemberRoleDropdown";
import { MemberTable } from "@/modules/member/table/MemberTable";
import { MemberModal } from "@/modules/member/modal/MemberModal";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { Heading } from "@/components/Headings";

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

          <div className="flex space-x-4">
            <MemberRoleDropdown />
            <MemberModal type="add" selectedRole={currentRole} />
          </div>
        </div>
        <MemberTable />
      </div>
    </div>
  );
};

export { MemberListPage };
