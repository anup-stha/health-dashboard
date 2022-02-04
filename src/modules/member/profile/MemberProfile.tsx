/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/4/22, 12:17 PM
 *
 *
 */

import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { ProfileDetails } from "@/modules/member/others/ProfileDetails";
import { ProfileTestSection } from "@/modules/member/others/ProfileTestSection";
import { PatientMedicalHistory } from "@/modules/member/others/PatientMedicalHistory";
import { UsersTable } from "@/modules/member/others/UsersTable";
import { MemberProfileControls } from "@/modules/member/others/MemberProfileControls";
import { ProfileSubscription } from "@/modules/member/others/ProfileSubscription";
import {
  useMemberSubsDetails,
  useSubscriptionList,
} from "@/services/requests/subscriptionRequests";
import React from "react";
import { ProfileSubsLoadingState } from "@/components/state/ProfileSubsLoadingState";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { InvoiceHistory } from "@/modules/member/invoice/InvoiceHistory";

const MemberProfile = () => {
  const selectedMember = useCurrentMemberStore((state) => state.member);
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const user = useAuthStore((state) => state.user);

  const { isFetching } = useMemberSubsDetails(
    user.id !== 1 ? 0 : selectedMember.id
  );
  const { isFetching: subsLoading } = useSubscriptionList(
    user.id! !== 1 ? 0 : Number(selectedRole.id)
  );

  return (
    <div className="flex gap-8 p-10 lg:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
      <div className="w-3/4 space-y-8 lg:w-full">
        <ProfileDetails selectedMember={selectedMember} />
        {selectedMember.role.slug === "patient" ? (
          <>
            <ProfileTestSection selectedMember={selectedMember} />
            <PatientMedicalHistory selectedMember={selectedMember} />
          </>
        ) : selectedMember.role.slug === "individual" ? (
          <ProfileTestSection selectedMember={selectedMember} />
        ) : selectedMember.role.slug === "org_admin" ? (
          <UsersTable />
        ) : null}
      </div>
      <div className="w-1/4 lg:w-full h-auto lg:grid lg:grid-cols-2  flex flex-col sm:flex sm:flex-col gap-8 ">
        {selectedMember.role.slug === "patient" ||
        selectedMember.role.slug === "org_operator" ? null : subsLoading &&
          isFetching ? (
          <ProfileSubsLoadingState />
        ) : (
          <ProfileSubscription member_id={selectedMember.id} />
        )}
        {selectedMember.role.slug === "org_admin" ? (
          <InvoiceHistory member_id={selectedMember.id} />
        ) : null}
        <MemberProfileControls
          selectedRole={selectedRole}
          selectedMember={selectedMember}
        />
      </div>
    </div>
  );
};

export { MemberProfile };
