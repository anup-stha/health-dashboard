/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:50 PM
 *
 *
 */

import React, { useState } from "react";
import { Role } from "@/types";
import { Member } from "@/modules/member/types";
import { MemberModal } from "@/modules/member/modal/MemberModal";
import { MemberOtherDetailModal } from "@/modules/member/modal/MemberOtherDetailModal";
import { PatientMedicalHistoryModal } from "@/modules/member/modal/PatientMedicalHistoryEditModal";
import Link from "next/link";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberToggle } from "@/modules/member/others/MemberToggle";

interface IMemberProfileControlsProps {
  selectedRole: Role;
  selectedMember: Member;
}

export const MemberProfileControls = ({
  selectedRole,
  selectedMember,
}: IMemberProfileControlsProps) => {
  const user = useAuthStore((state) => state.user);
  const [active, setActive] = useState(selectedMember.active);
  const [verified, setVerified] = useState(selectedMember.verified);

  return (
    <div className="flex flex-col gap-8 print:hidden">
      <div className="w-full bg-white rounded-xl ring-1 ring-black ring-opacity-10 self-start py-2 px-4 flex flex-col divide-y-[1px] divide-gray-500/40">
        <MemberModal
          type={"edit"}
          selectedRole={selectedRole}
          initialData={selectedMember}
        />
        <MemberOtherDetailModal
          otherDetails={selectedMember.details}
          memberData={selectedMember}
          selectedRole={selectedRole}
        />
        {selectedRole.slug === "patient" && (
          <PatientMedicalHistoryModal selectedMember={selectedMember} />
        )}
        {selectedMember.role && selectedMember.role.slug === "patient" ? (
          user.id === 1 ? (
            <Link href={`/member/org_admin/patient/test_report`}>
              <a className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
                Generate Test Report
              </a>
            </Link>
          ) : (
            <Link href={`/member/patient/test_report`}>
              <a className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
                Generate Test Report
              </a>
            </Link>
          )
        ) : null}
      </div>

      {user.role && user.role.id === 1 && selectedMember && (
        <div className="flex flex-col bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
          <MemberToggle
            toggle={"active"}
            memberId={selectedMember.id}
            currentState={active}
            setCurrentState={setActive}
            selectedMemberDetails={selectedMember}
          />
          <MemberToggle
            toggle={"verified"}
            memberId={selectedMember.id}
            currentState={verified}
            setCurrentState={setVerified}
            selectedMemberDetails={selectedMember}
          />
        </div>
      )}
    </div>
  );
};
