/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/22/22, 9:07 PM
 *
 *
 */

import { Menu } from "@headlessui/react";
import React from "react";

import { alert } from "@/components/Alert";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { Member } from "@/modules/members/types";
import { toggleActiveForMember, toggleVerifiedForMember } from "@/services/requests/memberRequests";

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
  const { member, user, setCurrentMember, setCurrentUser } = useCurrentMemberStore();

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
      ? toggleActiveForMember(Number(memberId), selectedMemberDetails.active ? 0 : 1).then(() =>
          onToggleActive(!currentState)
        )
      : toggleVerifiedForMember(Number(memberId), selectedMemberDetails.verified ? 0 : 1).then(() =>
          onToggleVerified(!currentState)
        );

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
    <Menu.Item onClick={onToggleHandler}>
      {({ active: btnActive }) => (
        <button
          className={`${
            btnActive ? `text-red-500 bg-red-50 text-white` : "text-primary_gray-700"
          } group flex rounded-md items-center w-full font-medium px-4 py-3 text-lg`}
        >
          <span>Mark {currentState ? `${toggle === "active" ? "Inactive" : "Not Verified"}` : toggle}</span>
        </button>
      )}
    </Menu.Item>
  ) : (
    <Menu.Item onClick={onToggleHandler}>
      {({ active }) => (
        <button
          className={`${
            active ? "text-primary-500 bg-primary-50" : "text-primary_gray-900"
          } group flex rounded-md items-center w-full font-medium px-4 py-3 text-lg`}
        >
          <span>Mark {currentState ? `${toggle === "active" ? "active" : "Verified"}` : toggle}</span>
        </button>
      )}
    </Menu.Item>
  );
};
