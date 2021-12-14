/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 8:08 PM
 *
 *
 */

import { Member } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { BooleanTag } from "../../../components/others/BooleanTag";
import { memberStore } from "../memberStore";
import { CaretDoubleRight } from "phosphor-react";
import { MemberModal } from "@/modules/members/modal/memberModal";
import { Popover, Transition } from "@headlessui/react";
import { MoreVertical } from "react-feather";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { MemberTableLoadingState } from "@/components/state/TableLoadingState";

type OrgTableRowType = {
  data?: Member;
  key?: string | number;
  loading?: boolean;
};

export const MemberTableRow: React.FC<OrgTableRowType> = ({
  data,
  key,
  loading,
}) => {
  const router = useRouter();
  const { selectedRole } = memberStore();

  return !loading ? (
    data ? (
      <tr key={key}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 h-16 w-16">
              <Image
                src={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 20
                )}`}
                layout="fill"
                objectFit="cover"
                className=" rounded-full"
                alt="Profile"
              />
            </div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-900 w-full">
                {data.name}
              </div>
              <div className="text-lg font-medium text-gray-500">
                {data.email}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-lg">
          {data.can_login ? (
            <BooleanTag type="info" trueStatement={"Yes "} />
          ) : (
            <BooleanTag type="info" trueStatement={"No"} />
          )}
        </td>
        <td className="whitespace-nowrap text-lg">
          <BooleanTag
            type="error"
            condition={data && data.active}
            trueStatement="Active"
            falseStatement="InActive"
          />
        </td>
        <td className="whitespace-nowrap text-lg">
          <BooleanTag
            type="error"
            condition={data && data.verified}
            trueStatement="Verified"
            falseStatement="Not Verified"
          />
        </td>
        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          {data.phone}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-lg text-gray-900 font-medium">
            {data.address}
          </div>
          <div className="text-lg text-gray-500 font-medium">
            <Link
              href={`https://maps.google.com/?q=${data.lat},${data.lng}`}
              passHref
            >
              <span className="flex items-center cursor-pointer hover:text-gray-800">
                Google Maps <CaretDoubleRight size={16} />
              </span>
            </Link>
          </div>
        </td>

        <td className="px-0 py-4">
          <div className="flex items-center space-x-4">
            <MemberModal type="update" orgId={data.id} />
            <DeleteModal
              onDelete={async () => {
                // await alert({
                //   type: "promise",
                //   promise: onDeleteOrg(data.id),
                //   msgs: {
                //     loading: `Deleting ${data.name}`,
                //     success: () => {
                //       return `Deleted ${data.name}`;
                //     },
                //     error: (data: any) => `${data}`,
                //   },
                // });
              }}
              title="You are about to delete a member"
              subTitles={[
                "This will delete your member forever",
                "Are you sure ?",
              ]}
            />
            <Popover className="">
              {({ open }: any) => (
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
                    <Popover.Panel className="absolute z-10 w-52 p-2 mt-3 right-16 bg-white ring-1 ring-black ring-opacity-5 rounded-sm shadow-lg space-y-2">
                      <div
                        className="overflow-hidden"
                        onClick={() =>
                          router.push(
                            `/members/profile?id=${data.id}&role=${selectedRole.id}`
                          )
                        }
                      >
                        <a className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70">
                          <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                            <p className=" font-medium whitespace-nowrap  ">
                              View Profile
                            </p>
                          </div>
                        </a>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </td>
      </tr>
    ) : null
  ) : (
    <MemberTableLoadingState count={5} />
  );
};
