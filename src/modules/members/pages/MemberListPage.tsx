/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";

import { ErrorState } from "@/components/Error";
import { Heading } from "@/components/Headings";
import { Loader } from "@/components/Loader";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberRoleDropdown } from "@/modules/members/components/dropdown/MemberRoleDropdown";
import { MemberModal } from "@/modules/members/components/modal/MemberModal";
import { ExcelImport } from "@/modules/members/components/others/PatientExcelImport";
import MemberTable from "@/modules/members/components/table/MemberTable";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { getCurrentUserProfile } from "@/services/requests/authRequests";
import { useRoleDetails, useRoleList } from "@/services/requests/roleRequests";

/**
 *
 * @constructor
 */
export function MemberListPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoading } = useRoleList();

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      await getCurrentUserProfile()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };

    getProfile();
  }, []);

  const currentRole = useCurrentMemberStore((state) => state.role);
  const { data, isLoading: roleLoading } = useRoleDetails(isEmpty(currentRole) ? 0 : currentRole.id);
  const user = useAuthStore((state) => state.user);

  if (isLoading || loading || roleLoading) return <Loader />;

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <Heading
            title="Members"
            subtitle="List of all members in a tabulated view. If not data found, please change role."
          />
          {data && (
            <div className="flex sm:flex-col gap-4">
              <MemberRoleDropdown />
              <MemberModal type="add" selectedRole={data?.data.data} />
              {user?.role.id !== 1 && <ExcelImport role={data.data.data} />}
            </div>
          )}
        </div>
        {data && <MemberTable />}
        {user?.role.role_access.length === 0 && <ErrorState title="No Roles Found" />}
      </div>
    </div>
  );
}
