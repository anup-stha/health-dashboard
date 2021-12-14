/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 7:58 PM
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
import { LineButton } from "@/components/Button";

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
          selectedMemberDetails.active ? 0 : 1
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

  return (
    <LineButton
      state={!currentState}
      buttonSize={"small"}
      width={"full"}
      onClick={() => onToggleHandler()}
    >
      Mark this member as{" "}
      {currentState
        ? `${toggle === "active" ? "Inactive" : "Not Verified"}`
        : toggle}
    </LineButton>
  );
};
