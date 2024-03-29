/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { Member, MemberOtherDetails } from "@/modules/members/types";

import { epochToDate } from "../../utils/epochToDate";

interface IProfileOverviewTabProps {
  other_details: MemberOtherDetails[];
  primary_details: Member;
}

/**
 * @param {Member} primary_details - basic details included in each member. These values are strictly compulsory.
 * @param {MemberOtherDetails} other_details - other details that are not required on not included in primary details
 * @return {JSX.Element}
 */
export function ProfileOverviewTab({ other_details, primary_details }: IProfileOverviewTabProps) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <h1 className="text-3xl font-medium text-gray-800">Profile Overview</h1>
      <div className="h-0.5 bg-slate-200 w-full absolute left-0 top-20" />
      <div className="flex flex-col mt-12">
        <div className="flex gap-4 w-full md:w-full">
          <div className="flex flex-col w-1/6 sm:w-1/2 gap-8">
            <div className="text-xl font-medium text-gray-400">Member Code</div>
            <div className="text-xl font-medium text-gray-400">Full Name</div>
            <div className="text-xl font-medium text-gray-400">Email Address</div>
            <div className="text-xl font-medium text-gray-400">Phone Number</div>
            <div className="text-xl font-medium text-gray-400">Date of Birth</div>
            <div className="text-xl font-medium text-gray-400">Age</div>
            <div className="text-xl font-medium text-gray-400">Address</div>
            <div className="text-xl font-medium text-gray-400">Gender</div>
            <div className="text-xl font-medium text-gray-400">Marital Status</div>
            {other_details.map((detail) => (
              <div key={detail.id} className="text-xl font-medium text-gray-400">
                {detail.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-5/6 sm:w-1/2 gap-8">
            <div className="text-xl font-Inter line-clamp-1 font-medium text-gray-800">
              {primary_details.member_code}
            </div>
            <div className="text-xl font-medium line-clamp-1 text-gray-800">{primary_details.name}</div>
            <a href={`mailto: ${primary_details.email}`} className="text-xl font-medium line-clamp-1 text-gray-800">
              {primary_details.email}
            </a>
            <a href={`tel: ${primary_details.phone}`} className="text-xl font-medium line-clamp-1 text-gray-850">
              +977-{primary_details.phone}
            </a>
            <div className="text-xl font-medium line-clamp-1 text-gray-850">{epochToDate(primary_details.dob_ad)}</div>
            <div className="text-xl font-medium line-clamp-1 text-gray-850">{primary_details?.age ?? 0} years</div>
            <div className="text-xl font-medium text-gray-850">{primary_details.address}</div>
            <div className="text-xl font-medium line-clamp-1 text-gray-850">{primary_details.gender}</div>

            <div className="text-xl font-medium line-clamp-1 text-gray-850">{primary_details.marital_status}</div>
            {other_details.map((detail) => (
              <div key={detail.id} className="text-xl font-medium line-clamp-1 text-gray-850">
                {detail.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
