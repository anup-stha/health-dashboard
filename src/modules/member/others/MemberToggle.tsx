/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/26/22, 8:28 PM
 *
 *
 */

import React from "react";
import { alert } from "@/components/Alert";
import {
  toggleActiveForMember,
  toggleVerifiedForMember,
} from "@/services/requests/memberRequests";
import { GreenLineButton, RedLineButton } from "@/components/Button";
import { Member } from "@/modules/member/types";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";

type MemberToggleProps = {
  toggle: "active" | "verified";
  memberId: number;
  currentState: boolean;
  setCurrentState: (value: boolean) => void;
  selectedMemberDetails: Member;
};

export const MemberToggle: React.FC<MemberToggleProps> = ({
  toggle,
  memberId,
  currentState,
  setCurrentState,
  selectedMemberDetails,
}) => {
  const { member, user, setCurrentMember, setCurrentUser } =
    useCurrentMemberStore();

  const onToggleActive = (status: boolean) => {
    if (member.id === memberId) {
      setCurrentMember({ ...member, active: status });
    } else if (user.id === memberId) {
      setCurrentUser({ ...user, active: status });
    }
    setCurrentState(status);
  };

  const onToggleVerified = (status: boolean) => {
    if (member.id === memberId) {
      setCurrentMember({ ...member, verified: status });
    } else if (user.id === memberId) {
      setCurrentUser({ ...user, verified: status });
    }
    setCurrentState(status);
  };
  const promise = () =>
    toggle === "active"
      ? toggleActiveForMember(
          Number(memberId),
          selectedMemberDetails.active ? 0 : 1
        ).then(() => onToggleActive(!currentState))
      : toggleVerifiedForMember(
          Number(memberId),
          selectedMemberDetails.verified ? 0 : 1
        ).then(() => onToggleVerified(!currentState));

  const onToggleHandler = async () => {
    await alert({
      type: "promise",
      promise: promise(),
      msgs: {
        loading: "Updating Status",
        success: "Status Updated",
      },
      id: "toggle-active",
    });
  };

  return currentState ? (
    <RedLineButton
      buttonSize={"small"}
      width={"full"}
      onClick={() => onToggleHandler()}
    >
      Mark{" "}
      {currentState
        ? `${toggle === "active" ? "Inactive" : "Not Verified"}`
        : toggle}
    </RedLineButton>
  ) : (
    <GreenLineButton
      buttonSize={"small"}
      width={"full"}
      onClick={() => onToggleHandler()}
    >
      Mark{" "}
      {currentState
        ? `${toggle === "active" ? "Inactive" : "Not Verified"}`
        : toggle}
    </GreenLineButton>
  );
};
