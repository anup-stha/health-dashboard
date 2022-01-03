/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 7:23 PM
 *
 *
 */

import { TableView } from "@/components/Table";

import Image from "next/image";
import { useSubscriptionStore } from "./subscriptionStore";
import { Subscription } from "@/types";
import React from "react";
import { BooleanTag } from "@/components/others/BooleanTag";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const SubscriptionTable = () => {
  const { subscriptionList } = useSubscriptionStore();
  const { selectedRole } = useMemberStore();

  return subscriptionList.list.length === 0 || selectedRole.id === 0 ? (
    <div className="flex justify-center">
      <div className="w-[48vw] h-[70vh] md:w-full md:h-[50vh] relative">
        <Image
          src="/assets/empty.svg"
          alt="Empty State"
          layout="fill"
          objectFit="cover"
          priority={true}
        />{" "}
      </div>
    </div>
  ) : (
    <TableView
      data={subscriptionList.list}
      tableHeadings={[
        "Name",
        "Price",
        "Interval",
        "Grace Period",
        "Sync Limit",
        "Test Limit",
      ]}
      tableRowComponent={<SubscriptionTableRow />}
      loading={false}
    />
  );
};

type SubscriptionTableRowProps = {
  data?: Subscription;
  key?: string | number;
  loading?: boolean;
};

const SubscriptionTableRow: React.FC<SubscriptionTableRowProps> = ({
  data,
  key,
  loading,
}) => {
  const router = useRouter();
  const { selectedRole } = useMemberStore();

  return !loading ? (
    data ? (
      <tr key={key}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 h-16 w-16">
              <Image
                src={"/subscription.png"}
                layout="fill"
                objectFit="cover"
                className=" rounded-full"
                alt="Profile"
              />
            </div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-900 w-full capitalize">
                {data.name}
              </div>
              <div className="text-lg font-medium text-gray-500">
                {data.slug}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-lg">
          <BooleanTag type={"info"} trueStatement={data.price} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-lg text-gray-900 font-semibold capitalize">
            {data.interval_type}
          </div>
          <div className="text-lg text-gray-500 font-medium">
            {data.interval_value} times
          </div>
        </td>
        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          {data.grace_period} days
        </td>
        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          {data.sync_limit} times
        </td>
        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          {data.test_limit} times
        </td>
        <td className="font-medium px-6 py-5 whitespace-nowrap text-lg">
          <button
            onClick={() =>
              router.push(
                `/subscriptions/${data.slug}?id=${data.id}&role=${selectedRole.id}`
              )
            }
            className="px-2 sm:px-6 w-full bg-neutral-700 hover:bg-neutral-800 hover:shadow-sm focus:shadow-sm transition-all duration-200 hover text-white flex items-center justify-center py-4 rounded-sm shadow-lg cursor-pointer"
          >
            View Test Details
          </button>
        </td>
      </tr>
    ) : (
      <div></div>
    )
  ) : (
    <div></div>
  );
};
