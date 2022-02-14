/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/14/22, 5:50 PM
 *
 *
 */

import { Member, MemberOtherDetails } from "@/modules/member/types";
import { dateConvert } from "@/modules/member/others/ProfileDetails";

interface IProfileOverviewTabProps {
  other_details: MemberOtherDetails[];
  primary_details: Member;
}

/**
 * @param {Member} primary_details - basic details included in each member. These values are strictly compulsory.
 * @param {MemberOtherDetails} other_details - other details that are not required on not included in primary details
 * @return {JSX.Element}
 */
export function ProfileOverviewTab({
  other_details,
  primary_details,
}: IProfileOverviewTabProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">Profile Overview</h1>
      <div className="h-0.5 bg-slate-200 w-full absolute left-0 top-20" />
      <div className="flex flex-col mt-12">
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <div className="flex flex-col gap-8">
            <div className="text-xl font-medium text-gray-400">Member Code</div>
            <div className="text-xl font-medium text-gray-400">Full Name</div>
            <div className="text-xl font-medium text-gray-400">
              Email Address
            </div>
            <div className="text-xl font-medium text-gray-400">
              Phone Number
            </div>
            <div className="text-xl font-medium text-gray-400">
              Date of Birth
            </div>
            <div className="text-xl font-medium text-gray-400">Address</div>
            <div className="text-xl font-medium text-gray-400">Gender</div>
            <div className="text-xl font-medium text-gray-400">
              Marital Status
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-xl font-Inter font-semibold text-gray-800">
              {primary_details.member_code}
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {primary_details.name}
            </div>
            <a
              href={`mailto: ${primary_details.email}`}
              className="text-xl font-semibold text-gray-800"
            >
              {primary_details.email}
            </a>
            <a
              href={`tel: ${primary_details.phone}`}
              className="text-xl font-semibold text-gray-850"
            >
              +977-{primary_details.phone}
            </a>
            <div className="text-xl font-semibold text-gray-850">
              {dateConvert(primary_details.dob_ad)}
            </div>
            <div className="text-xl font-semibold text-gray-850">
              {primary_details.address}
            </div>
            <div className="text-xl font-semibold text-gray-850">
              {primary_details.gender}
            </div>
            <div className="text-xl font-semibold text-gray-850">
              {primary_details.marital_status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
