/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/26/22, 10:13 AM
 *
 *
 */

import React from "react";
import LetteredAvatar from "react-avatar";
import { Member } from "@/modules/member/types";
import Image from "next/image";

interface IProfileHeader {
  selectedMember: Member;
}

export const ProfileHeader = ({ selectedMember }: IProfileHeader) => {
  return (
    <div className="absolute left-[3%] top-40 z-0 flex items-center gap-x-6">
      {selectedMember.image ? (
        <div className="w-40 h-40 ring-4 ring-white rounded-full object-contain  relative">
          <Image
            src={selectedMember.image}
            layout="fill"
            className="absolute rounded-full"
            alt="Avatar"
            objectFit="contain"
          />
        </div>
      ) : (
        <div className="ring-4 ring-white rounded-full">
          <LetteredAvatar
            name={selectedMember.name}
            size="120"
            round={true}
            maxInitials={2}
          />
        </div>
      )}
      <div className="flex flex-col mt-10">
        <h1 className="capitalize text-gray-900 font-semibold text-3xl tracking-wider sm:text-3xl">
          {selectedMember?.name}
        </h1>
        <p className="text-gray-500 font-semibold text-xl sm:text-lg">
          {selectedMember.role.name}
        </p>
      </div>
    </div>
  );
};
