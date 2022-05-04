/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 3:18 PM
 *
 */

import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CaretDoubleRight, PhoneCall } from "phosphor-react";
import React, { Fragment } from "react";
import LetteredAvatar from "react-avatar";
import { MoreVertical } from "react-feather";

import "react-loading-skeleton/dist/skeleton.css";

import { BooleanTag } from "@/components/others/BooleanTag";
import { MemberTableLoadingState } from "@/components/state/TableLoadingState";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { Member } from "@/modules/members/types";

type OrgTableRowType = {
  data?: Member;
  key?: string | number;
  loading?: boolean;
};

export const DoctorTableRow: React.FC<OrgTableRowType> = ({ data, key, loading }) => {
  const router = useRouter();
  const setCurrentMember = useCurrentMemberStore((state) => state.setCurrentMember);

  const onMemberClick = () => {
    if (data) {
      setCurrentMember(data);
      router.push(`/organizations/patients`);
    }
  };

  return !loading ? (
    data ? (
      <tr key={key}>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 h-16 w-16 cursor-pointer" onClick={onMemberClick}>
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
              <div className="text-xl font-medium text-gray-900  capitalize cursor-pointer" onClick={onMemberClick}>
                {data.name}
              </div>
              <a
                href={`mailto: ${data.email}`}
                className="text-base tracking-wide font-light text-gray-500 hover:text-gray-800"
              >
                {data.email}
              </a>
            </div>
          </div>
        </td>
        <td className="  px-6 py-4 whitespace-nowrap font-mono text-base">
          <span className="px-2 py-1  font-Inter font-bold tracking-wider text-gray-600 bg-gray-100 rounded-lg">
            {data.member_code}
          </span>
        </td>

        <td className=" px-6 py-4 whitespace-nowrap text-base capitalize">
          <BooleanTag
            type="error"
            condition={data && data.verified}
            trueStatement="Verified"
            falseStatement="Not Verified"
          />
        </td>

        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          <div className="flex hover:text-gray-800 items-center gap-2">
            <PhoneCall weight="duotone" size={18} />
            <a href={`tel:${data.phone}`}>{data.phone.slice(0, 14)}</a>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-lg text-gray-700 font-medium capitalize">{data.address.slice(0, 25)}</div>
          <div className="text-lg text-gray-500 font-medium">
            <a target="_blank" href={`https://maps.google.com/?q=${data.lat},${data.lng}`} rel="noreferrer">
              <span className="flex items-center cursor-pointer hover:text-gray-800">
                Google Maps <CaretDoubleRight size={16} />
              </span>
            </a>
          </div>
        </td>

        <td className="px-4 py-4 ">
          <div className="flex items-center space-x-4 px-4">
            <Popover className="relative">
              <>
                <Popover.Button>
                  <MoreVertical
                    name="more-vertical"
                    className=" text-gray-400 cursor-pointer hover:text-gray-800 -ml-2 mt-1"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Popover.Panel className="cursor-pointer absolute z-50 w-52 py-2 mt-3 right-2 bg-white ring-1 ring-black ring-opacity-5 rounded-sm shadow-lg space-y-2">
                    <div className="overflow-hidden" onClick={onMemberClick}>
                      <a className="bg-white flex items-center transition duration-150 ease-in-out group hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-70">
                        <div className="py-3 text-xl flex items-center px-4 gap-2 text-neutral-700 group-hover:text-neutral-900 ">
                          <p className=" font-medium whitespace-nowrap  ">View Profile</p>
                        </div>
                      </a>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            </Popover>
          </div>
        </td>
      </tr>
    ) : null
  ) : (
    <MemberTableLoadingState count={5} />
  );
};
