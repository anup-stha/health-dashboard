/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 10:18 AM
 *
 *
 */

import { MemberDetailAddModal } from "@/modules/members/modal/MemberDetailAddModal";
import { MemberToggle } from "@/modules/members/others/MemberToggle";
import React from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { PatientMedicalHistoryModal } from "@/modules/members/modal/PatientMedicalHistoryModal";
import { Member, Role } from "@/types";
import omit from "lodash/omit";
import { MemberModal } from "@/modules/members/modal/memberModal";

type MemberProfileControlProps = {
  active: boolean;
  verified: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMember: Member;
  selectedRole: Role;
};

export const MemberProfileControls: React.FC<MemberProfileControlProps> = ({
  active,
  verified,
  setActive,
  setVerified,
  selectedMember,
  selectedRole,
}) => {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-8 print:hidden">
      <div className="w-full bg-white rounded-xl ring-1 ring-black ring-opacity-10 self-start py-2 px-4 flex flex-col divide-y-[1px] divide-gray-500/40">
        {selectedRole && (
          <MemberModal
            type={"edit"}
            selectedRole={selectedRole}
            initialData={{
              member_id: Number(router.query.id),
              ...omit(selectedMember, ["ref_key"]),
            }}
          />
        )}

        {selectedRole.slug === "patient" ||
          (selectedRole.slug === "individual" && (
            <PatientMedicalHistoryModal />
          ))}

        <MemberDetailAddModal
          memberData={selectedMember}
          selectedRole={selectedRole}
        />
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
