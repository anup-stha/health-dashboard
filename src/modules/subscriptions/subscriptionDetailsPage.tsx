/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/20/21, 2:15 PM
 *
 *
 */

import { TableView } from "@/components/Table";
import { useSubscriptionStore } from "./subscriptionStore";
import React from "react";
import Image from "next/image";
import { BooleanTag } from "@/components/others/BooleanTag";
import { alert } from "@/components/Alert";
import { removeTestFromSubscription } from "@/services/requests/subscriptionRequests";

export const SubscriptionDetails: React.FC = () => {
  const { subscriptionDetails } = useSubscriptionStore();
  const categoryData = subscriptionDetails.map((test) =>
    test.sub_categories.map((subTest) => ({
      ...subTest,
      category_name: test.name,
      category_desc: test.desc,
    }))
  );
  return (
    <TableView
      data={categoryData[0]}
      tableHeadings={[
        "Name",
        "Category Description",
        "Public",
        "Sub-Category Description",
        "",
        "",
      ]}
      tableRowComponent={<SubscriptionTestDetailsRow />}
      loading={false}
    />
  );
};

const SubscriptionTestDetailsRow = ({ data }: any) => {
  console.log(data);

  return data ? (
    <tr className={"text-lg"}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 h-16 w-16">
            <Image
              src={"/sub_test.png"}
              layout="fill"
              objectFit="cover"
              className=""
              alt="Profile"
            />
          </div>
          <div className="ml-4">
            <div className="text-xl font-semibold text-gray-900 w-full capitalize">
              {data.name}
            </div>
            <div className="text-lg font-medium text-gray-500">
              {data.category_name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{data.category_desc}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BooleanTag
          type={"info"}
          trueStatement={data.public ? "Public" : "Not Public"}
        ></BooleanTag>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{data.desc}</td>
      <td></td>

      <td className="font-medium px-6 py-5 whitespace-nowrap text-lg">
        <button
          onClick={async () =>
            alert({
              type: "promise",
              promise: removeTestFromSubscription(data.category_id, data.id),
              msgs: {
                loading: "Removing Test",
              },
              id: "remove-test-from-id",
            })
          }
          className="w-full bg-neutral-700 hover:bg-neutral-800 hover:shadow-sm focus:shadow-sm transition-all duration-200 hover text-white flex items-center justify-center py-4 rounded-sm shadow-lg cursor-pointer"
        >
          Remove Test
        </button>
      </td>
    </tr>
  ) : (
    <tr></tr>
  );
};
