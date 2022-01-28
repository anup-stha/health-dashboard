/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:15 PM
 *
 *
 */

import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { ProfileDetails } from "@/modules/member/others/ProfileDetails";
import { ProfileTestSection } from "@/modules/member/others/ProfileTestSection";
import { PatientMedicalHistory } from "@/modules/member/others/PatientMedicalHistory";
import { MemberProfileControls } from "@/modules/member/others/MemberProfileControls";

export const SubMemberProfile = () => {
  const selectedMember = useCurrentMemberStore((state) => state.user);
  const selectedRole = useCurrentMemberStore((state) => state.userRole);

  return (
    <div className="flex gap-8 p-10 lg:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
      <div className="w-3/4 space-y-8 lg:w-full">
        <ProfileDetails selectedMember={selectedMember} />
        {selectedMember.role.slug === "patient" ? (
          <>
            <ProfileTestSection selectedMember={selectedMember} />
            <PatientMedicalHistory selectedMember={selectedMember} />
          </>
        ) : null}
      </div>
      <div className="w-1/4 lg:w-full h-auto lg:grid lg:grid-cols-2  flex flex-col sm:flex sm:flex-col gap-8 ">
        <MemberProfileControls
          selectedRole={selectedRole}
          selectedMember={selectedMember}
        />
      </div>
    </div>
  );
};
