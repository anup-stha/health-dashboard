/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 4:47 PM
 *
 */

import Image from "next/image";
import React from "react";
import LetteredAvatar from "react-avatar";

import { Button } from "@/components/Button";
import { promiseToast } from "@/components/Toast";

import { AccessorQuery, useGetOrganizationDoctors } from "@/modules/members/hooks/query/AccessorQuery";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { Member } from "@/modules/members/types";

type DoctorTableRowProps = {
  data?: Member;
};
export const DoctorTableRow = ({ data }: DoctorTableRowProps) => {
  const { mutateAsync: assignDoctor, isLoading } = AccessorQuery.useAssign();
  const organization = useCurrentMemberStore((state) => state.member);
  const { data: assignedDoctors } = useGetOrganizationDoctors(organization.id);

  if (!data) return null;

  const isDoctorAssigned = assignedDoctors?.list.some((doctor) => doctor.id === data.id);

  return (
    <tr key={data?.id}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 h-16 w-16 cursor-pointer">
            <div
              className={`${
                data.active ? "bg-primary-500" : "bg-red-700"
              } w-4 h-4 rounded-full absolute right-0 shadow-sm ring-2 ring-white z-10`}
            />
            {data.image ? (
              <div className="w-[4.2rem] h-[4.2rem] rounded-full object-contain overflow-hidden relative">
                <Image src={data.image} layout="fill" objectFit="cover" alt="profile" />
              </div>
            ) : (
              <LetteredAvatar name={data.name} size="50" round={true} maxInitials={2} />
            )}
          </div>
          <div className="ml-4 gap-1 flex flex-col">
            <div className="text-xl font-medium text-gray-900  capitalize cursor-pointer">{data.name}</div>
            <a
              href={`mailto: ${data.email}`}
              className="text-base tracking-wide font-light text-gray-500 hover:text-gray-800"
            >
              {data.email}
            </a>
          </div>
        </div>
      </td>
      <td className="flex justify-end">
        <Button
          loading={isLoading}
          disabled={isDoctorAssigned || isLoading}
          size="sm"
          color={isLoading || isDoctorAssigned ? "secondary" : "primary"}
          onClick={() =>
            promiseToast({
              isModal: false,
              promise: assignDoctor({
                doctor_id: data.id,
                member_id: organization.id,
              }),
              msgs: {
                loading: "Assigning Doctor",
                success: "Doctor Assigned Successfully",
              },
              id: "assign-doctor-toast",
            })
          }
        >
          {isLoading ? "" : isDoctorAssigned ? "Already Assigned" : "Assign"}
        </Button>
      </td>
    </tr>
  );
};
