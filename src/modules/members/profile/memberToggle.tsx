/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 7:55 AM
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
    <div
      className="capitalize hover:text-gray-800 p-6 border-b-2 border-gray-200 text-gray-500 text-xl font-semibold cursor-pointer "
      onClick={() => onToggleHandler()}
    >
      Mark As {currentState ? `Not ${toggle}` : toggle}
    </div>
  );
};
