/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:52 PM
 *
 *
 */

import { ProfileDataDetail } from "@/modules/member/others/MemberProfileDataDetail";
import { Calendar, Mail, Map, PhoneCall, User } from "react-feather";
import { GenderNeuter } from "phosphor-react";
import React from "react";
import { dateConvert } from "@/modules/member/others/ProfileDetails";
import { Member } from "@/modules/member/types";

interface IProfilePrimaryDetails {
  selectedMember: Member;
}

export const ProfilePrimaryDetails = ({
  selectedMember,
}: IProfilePrimaryDetails) => {
  return (
    <div className="p-6 bg-gray-50 w-2/5 rounded-lg flex flex-col gap-4 sm:w-full ">
      <p className="text-2xl font-semibold text-gray-900">Personal Info</p>
      <ProfileDataDetail icon={<User />} detail={selectedMember.member_code} />
      <ProfileDataDetail
        icon={<Mail />}
        href={`mailto: ${selectedMember.email}`}
        detail={selectedMember.email}
      />
      <ProfileDataDetail icon={<Map />} detail={selectedMember.address} />
      <ProfileDataDetail
        icon={<PhoneCall />}
        href={`tel:${selectedMember.phone}`}
        detail={selectedMember.phone}
      />
      <ProfileDataDetail
        icon={<Calendar />}
        detail={dateConvert(selectedMember.dob_ad)}
      />
      <ProfileDataDetail
        icon={<GenderNeuter size={24} weight={"bold"} />}
        detail={selectedMember.gender}
      />
    </div>
  );
};
