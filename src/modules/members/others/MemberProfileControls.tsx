/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:14 PM
 *
 *
 */

import { MemberModal } from "@/modules/members/modal/memberModal";
import _ from "lodash";
import { MemberDetailAddModal } from "@/modules/members/modal/MemberDetailAddModal";
import { MemberToggle } from "@/modules/members/others/MemberToggle";
import React from "react";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { useAuthStore } from "@/modules/auth/useTokenStore";

type MemberProfileControlProps = {
  active: boolean;
  verified: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MemberProfileControls: React.FC<MemberProfileControlProps> = ({
  active,
  verified,
  setActive,
  setVerified,
}) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const { selectedRole, selectedMember } = useMemberStore();

  return (
    <div className="flex flex-col gap-8 print:hidden">
      <div className="w-full bg-white rounded-xl ring-1 ring-black ring-opacity-10 self-start py-2 px-4 flex flex-col divide-y-[1px] divide-gray-500/40">
        <MemberModal
          type={"edit"}
          initialData={{
            member_id: Number(router.query.id),
            ..._.omit(selectedMember, ["ref_key"]),
          }}
        />
        <MemberDetailAddModal
          memberData={selectedMember}
          selectedRole={selectedRole}
        />
      </div>
      {user.role.id === 1 && selectedMember && (
        <div className="flex flex-col  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
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
