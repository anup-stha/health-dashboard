/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/24/22, 9:01 PM
 *
 *
 */

import { BooleanTag } from "@/components/others/BooleanTag";
import React from "react";
import { Member } from "@/modules/member/types";

interface IProfileStatus {
  selectedMember: Member;
}

export const ProfileStatus = ({ selectedMember }: IProfileStatus) => {
  return (
    <div className="ml-[20%] flex justify-between items-center sm:items-start sm:ml-0 sm:mt-6 sm:-mb-16">
      <div className="sm:hidden" />
      <div className="flex items-center gap-2 sm:mt-24 text-lg ">
        <BooleanTag
          type="error"
          condition={selectedMember.active}
          trueStatement="Active"
          falseStatement="InActive"
        />
        <BooleanTag
          type="error"
          condition={selectedMember.verified}
          trueStatement="Verified"
          falseStatement="Not Verified"
        />

        <BooleanTag
          type="info"
          trueStatement={
            selectedMember.can_login ? "Can Login" : "Cannot Login"
          }
        />
      </div>
    </div>
  );
};
