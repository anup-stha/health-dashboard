/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 2:23 PM
 *
 *
 */

import { MemberDetailAddModal } from "@/modules/members/modal/MemberDetailAddModal";
import { MemberToggle } from "@/modules/members/others/MemberToggle";
import React from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { PatientMedicalHistoryModal } from "@/modules/members/modal/PatientMedicalHistoryModal";
import { Member, MemberDetails, Role } from "@/types";
import omit from "lodash/omit";
import { MemberModal } from "@/modules/members/modal/MemberModal";
import Link from "next/link";

type MemberProfileControlProps = {
  active: boolean;
  verified: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMember: Member;
  selectedRole: Role;
  otherDetails: MemberDetails[];
};

export const MemberProfileControls: React.FC<MemberProfileControlProps> = ({
  active,
  verified,
  setActive,
  setVerified,
  selectedMember,
  selectedRole,
  otherDetails,
}) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-8 print:hidden">
      <div className="w-full bg-white rounded-xl ring-1 ring-black ring-opacity-10 self-start py-2 px-4 flex flex-col divide-y-[1px] divide-gray-500/40">
        {selectedRole && (
          <MemberModal
            type={"edit"}
            selectedRole={selectedRole}
            initialData={{
              ...omit(selectedMember, ["ref_key"]),
              member_id: Number(router.query.id),
            }}
          />
        )}

        {(selectedRole.slug === "patient" ||
          selectedRole.slug === "individual") && <PatientMedicalHistoryModal />}

        <MemberDetailAddModal
          otherDetails={otherDetails}
          memberData={selectedMember}
          selectedRole={selectedRole}
        />

        {selectedMember.role && selectedMember.role.slug === "patient" ? (
          user.id === 1 ? (
            <Link
              href={`/members/org_admin/patient/test_report?pat_id=${selectedMember.id}&role=5&p_id=${selectedMember.parent_member_id}&p_role=${router.query.p_role}&p_page=${router.query.p_page}&m_page=${router.query.m_page}`}
            >
              <a className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
                Generate Test Report
              </a>
            </Link>
          ) : (
            <Link
              href={`/members/patient/test_report?pat_id=${selectedMember.id}&role=5&p_page=${router.query.p_page}`}
            >
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
            memberId={Number(router.query.id)}
            currentState={active}
            setCurrentState={setActive}
            selectedMemberDetails={selectedMember}
          />
          <MemberToggle
            toggle={"verified"}
            memberId={Number(router.query.id)}
            currentState={verified}
            setCurrentState={setVerified}
            selectedMemberDetails={selectedMember}
          />
        </div>
      )}
    </div>
  );
};
