/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/31/22, 1:05 PM
 *
 *
 */

import React from "react";
import moment from "moment";
import Image from "next/image";
import { Member } from "@/modules/member/types";
import { ProfilePrimaryDetails } from "@/modules/member/others/ProfilePrimaryDetails";
import { ProfileOtherDetails } from "@/modules/member/others/ProfileOtherDetails";
import { ProfileHeader } from "@/modules/member/others/ProfileHeader";
import { ProfileStatus } from "@/modules/member/others/ProfileStatus";

type MemberDetailsProps = {
  selectedMember: Member;
};

export const ProfileDetails: React.FC<MemberDetailsProps> = ({
  selectedMember,
}) => {
  return (
    <div className="print:hidden relative w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
      <div className="relative w-full h-52 z-0 profile">
        <Image
          src="/assets/cover-bg.svg"
          layout={"fill"}
          objectFit={"cover"}
          objectPosition={"left center"}
        />
      </div>

      <ProfileHeader selectedMember={selectedMember} />
      {selectedMember && (
        <div className="min-h-[10rem] p-4">
          {selectedMember.id !== 1 ? (
            <ProfileStatus selectedMember={selectedMember} />
          ) : null}

          <div className="mt-20 font-medium text-gray-700 flex gap-x-6 sm:flex-col sm:gap-y-4 items-stretch">
            <ProfilePrimaryDetails selectedMember={selectedMember} />
            <ProfileOtherDetails details={selectedMember.details} />
          </div>
        </div>
      )}
    </div>
  );
};

export const dateConvert = (epochInSec: number) =>
  moment(epochInSec * 1000).format("MMMM Do YYYY");
