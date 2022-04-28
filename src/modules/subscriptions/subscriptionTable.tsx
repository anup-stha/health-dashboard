/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/25/22, 6:55 PM
 *
 *
 */

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { BooleanTag } from "@/components/others/BooleanTag";
import { TableView } from "@/components/Table";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";

import { useSubscriptionStore } from "./subscriptionStore";

import { Subscription } from "@/types";

export const SubscriptionTable = () => {
  const { subscriptionList } = useSubscriptionStore();
  const { role: selectedRole } = useCurrentMemberStore();

  return subscriptionList.list.length === 0 || selectedRole.id === 0 ? (
    <div className="flex flex-col justify-start py-32 items-center gap-4">
      <div className="object-contain w-full h-32 relative ">
        <Image src="/assets/not-found.svg" alt="Empty State" layout="fill" objectFit="contain" priority={true} />{" "}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-medium text-primary-600">No Subscription found</div>
        <div className="text-lg font-medium text-gray-500">Please switch role or add a new subscription.</div>
      </div>
    </div>
  ) : (
    <TableView
      data={subscriptionList.list}
      tableHeadings={["Name", "Price", "Interval", "Grace Period", "Sync Limit", "Test Limit", ""]}
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

const SubscriptionTableRow: React.FC<SubscriptionTableRowProps> = ({ data, key, loading }) => {
  const router = useRouter();
  const { role: selectedRole } = useCurrentMemberStore();

  return !loading ? (
    data ? (
      <tr key={key}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div>
              <div
                className="text-xl font-medium text-gray-900 w-full capitalize"
                data-testid={`${data.slug}-subs-name`}
              >
                {data.name}
              </div>
              <div className="text-lg font-medium text-gray-500" data-testid={`${data.slug}-subs-slug`}>
                {data.slug}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-lg" data-testid={`${data.slug}-subs-price`}>
          <BooleanTag type="info" trueStatement={data.price} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-lg text-gray-900 font-medium capitalize" data-testid={`${data.slug}-subs-interval_type`}>
            {data.interval_type}
          </div>
          <div className="text-lg text-gray-500 font-medium" data-testid={`${data.slug}-subs-interval_value`}>
            {data.interval_value} times
          </div>
        </td>
        <td
          className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500"
          data-testid={`${data.slug}-subs-grace_period`}
        >
          {data.grace_period} days
        </td>
        <td
          className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500"
          data-testid={`${data.slug}-subs-sync_limit`}
        >
          {data.sync_limit} times
        </td>
        <td
          className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500"
          data-testid={`${data.slug}-subs-test_limit`}
        >
          {data.test_limit} times
        </td>
        <td className="font-medium px-6 py-5 whitespace-nowrap text-lg">
          <button
            data-testid={`${data.slug}-subs-btn`}
            onClick={() => router.push(`/subscriptions/${data.slug}?id=${data.id}&role=${selectedRole.id}`)}
            className="px-2 sm:px-6 w-full bg-neutral-700 hover:bg-neutral-800 hover:shadow-sm focus:shadow-sm transition-all duration-200 hover text-white flex items-center justify-center py-4 rounded-sm shadow-lg cursor-pointer"
          >
            View Test Details
          </button>
        </td>
      </tr>
    ) : (
      <tr />
    )
  ) : (
    <tr />
  );
};
