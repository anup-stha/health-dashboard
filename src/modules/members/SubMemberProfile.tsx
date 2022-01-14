/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/14/22, 11:59 AM
 *
 *
 */

import { useRouter } from "next/router";
import { useMemberDetails } from "@/modules/members/api/hooks/useMemberDetails";
import { useRoleDetails, useRoleList } from "@/services/requests/roleRequests";
import { useTestList } from "@/services/requests/testRequests";
import { useNestedMemberList } from "@/modules/members/api/hooks/useNestedMemberList";
import { Loader } from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { ProfileAllDetails } from "@/modules/members/profile/ProfileAllDetails";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { ProfileTestComponent } from "@/modules/members/profile/ProfileTestComponent";
import { ProfileMedicalHistory } from "@/modules/members/MemberProfile";
import { MemberProfileControls } from "@/modules/members/others/MemberProfileControls";

export const SubMemberProfile = () => {
  const router = useRouter();
  const idX = {
    member_id: router.query.id,
    member_role_id: router.query.role,
    member_parent_id: router.query.p_id,
    member_parent_role: router.query.p_role,
    member_parent_page: router.query.p_page,
  };

  const { data: parentRoleData } = useRoleDetails(Number(idX.member_parent_id));
  const { data: roleDetailsData } = useRoleDetails(Number(idX.member_role_id));
  const { isLoading: testLoading } = useTestList();
  const { isLoading: roleListLoading } = useRoleList();
  const { isLoading: nestedLoading } = useNestedMemberList(
    Number(idX.member_role_id),
    Number(idX.member_parent_id),
    Number(idX.member_id),
    Number(idX.member_parent_page)
  );
  const { isFetching: memberDetailsFetching } = useMemberDetails(
    Number(idX.member_id)
  );
  const otherDetails = useMemberStore((state) => state.selectedMemberDetails);

  const loading =
    memberDetailsFetching ||
    roleListLoading ||
    testLoading ||
    !roleDetailsData ||
    nestedLoading;

  const selectedMember = useMemberStore(
    (state) => state.memberListBySlug.selectedMember
  );
  const selectedRole = useMemberStore((state) => state.nestedSelectedRole);
  const [active, setActive] = useState(
    selectedMember ? selectedMember.active : false
  );
  const [verified, setVerified] = useState(
    selectedMember ? selectedMember.verified : false
  );

  useEffect(() => {
    selectedMember && setActive(selectedMember.active);
    selectedMember && setVerified(selectedMember.verified);
  }, [selectedMember]);

  useEffect(() => {
    !Array.isArray(idX.member_parent_role) &&
      !Array.isArray(idX.member_parent_id) &&
      useMemberStore
        .getState()
        .setParent(idX.member_parent_id ?? "0", idX.member_parent_role ?? "0");

    parentRoleData &&
      useMemberStore.getState().setSelectedRole(parentRoleData.data.data);
  }, [idX]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex gap-8 p-10 lg:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
      <div className="w-3/4 space-y-8 lg:w-full">
        {selectedMember && selectedRole && (
          <ProfileAllDetails
            active={active}
            verified={verified}
            selectedMember={selectedMember}
            selectedRole={roleDetailsData?.data.data}
          />
        )}
        {selectedRole.slug === "patient" ||
        selectedRole.slug === "individual" ? (
          <>
            {selectedMember && (
              <ProfileTestComponent selectedMember={selectedMember} />
            )}
            <ProfileMedicalHistory />
          </>
        ) : null}
      </div>

      <div className=" w-1/4 lg:w-full h-auto lg:grid lg:grid-cols-2  flex flex-col sm:flex sm:flex-col gap-8 ">
        {selectedMember && roleDetailsData && (
          <MemberProfileControls
            active={active}
            verified={verified}
            setActive={setActive}
            setVerified={setVerified}
            selectedMember={selectedMember}
            selectedRole={roleDetailsData?.data.data}
            otherDetails={otherDetails}
          />
        )}
      </div>
    </div>
  );
};
