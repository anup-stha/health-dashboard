/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 5:39 PM
 *
 *
 */

import React from "react";
import { alert } from "@/components/Alert";
import {
  toggleActiveForMember,
  toggleVerifiedForMember,
} from "@/services/requests/memberRequests";
import { Member } from "@/types";
import { GreenLineButton, RedLineButton } from "@/components/Button";

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
  const promise = () =>
    toggle === "active"
      ? toggleActiveForMember(
          Number(memberId),
          selectedMemberDetails.active ? 0 : 1
        ).then(() => setCurrentState(!currentState))
      : toggleVerifiedForMember(
          Number(memberId),
          selectedMemberDetails.verified ? 0 : 1
        ).then(() => setCurrentState(!currentState));

  const onToggleHandler = async () => {
    await alert({
      type: "promise",
      promise: promise(),
      msgs: {
        loading: "Updating Status",
        success: "Active Status Updated",
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
