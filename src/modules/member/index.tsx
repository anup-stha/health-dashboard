/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/7/22, 3:59 PM
 *
 *
 */

import { MemberRoleDropdown } from "@/modules/member/others/MemberRoleDropdown";
import { MemberTable } from "@/modules/member/table/MemberTable";
import { MemberModal } from "@/modules/member/modal/MemberModal";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { Heading } from "@/components/Headings";
import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";

const MemberListPage = () => {
  const currentRole = useCurrentMemberStore((state) => state.role);
  const setSelected = useCurrentMemberStore((state) => state.setCurrentRole);
  const loggedInUser = useAuthStore((state) => state.user);
  const roleList = useRoleStore
    .getState()
    .roleList.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    !currentRole && setSelected(roleList[0]);
  }, [loggedInUser.uuid]);

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
