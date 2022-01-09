/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/9/22, 10:48 AM
 *
 *
 */

import { MemberTestListData, MemberTestReport } from "@/types";
import React from "react";
import moment from "moment";
import { GooglePlayLogo } from "phosphor-react";
import { Calendar } from "iconsax-react";
import { TableView } from "@/components/Table";
import { utcDateToLocal } from "@/modules/members/profile/ProfileTestComponent";

type ProfileTestData = {
  app_slug: string;
  test_date: Date;
  tests: { [p: string]: any }[];
};
export const ProfileTestTableRow = ({ data }: { data?: ProfileTestData }) => {
  return data ? (
    <tr>
      <td className="capitalize px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-700">
        {data.app_slug}
      </td>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700">
        <div className="flex flex-col space-y-2">
          <span>
            {moment(utcDateToLocal(data.test_date)).format("MM/DD/YYYY")}
          </span>

          <span>{moment(utcDateToLocal(data.test_date)).format("h:mm A")}</span>
        </div>
      </td>
      <td className="capitalize px-6 py-4 text-xl space-y-2 whitespace-nowrap ">
        {data.tests.map((element, index) => (
          <div key={index} className="flex space-x-2 text-gray-700">
            <span className="font-medium text-gray-500">
              {Object.keys(element)[0]} :{" "}
            </span>
            <span className="font-semibold line-clamp-1">
              {Object.values(element)[0]}
            </span>
          </div>
        ))}
      </td>
      <td className="capitalize px-6 py-4 text-xl space-y-2 text-gray-600">
        {data.tests.map((element, index) => (
          <div key={index} className=" text-gray-700 flex space-x-2">
            <span className="font-medium text-gray-500">
              {Object.keys(element)[1]} :{" "}
            </span>
            <span className="font-semibold flex flex-col">
              {Object.values(element)[1].length === 0
                ? "N/A"
                : Object.values(element)[1].map(
                    (element: any, index: number) => (
                      <span key={index} className="line-clamp-2">
                        {" "}
                        {element}{" "}
                      </span>
                    )
                  )}
            </span>
          </div>
        ))}
      </td>
    </tr>
  ) : (
    <tr />
  );
};
type ProfileTestGridViewProps = {
  testDetails: MemberTestListData;
};
export const ProfileTestGridView: React.FC<ProfileTestGridViewProps> = ({
  testDetails,
}) => {
  return (
    <div
      className={
        "grid grid-cols-2 gap-8 items-stretch justify-stretch sm:grid-cols-1 sm:gap-6 print:grid-cols-1"
      }
    >
      {Object.keys(testDetails).length !== 0 &&
        testDetails.list.length !== 0 &&
        testDetails.list.map((test) => (
          <div className="flex items-stretch" key={test.id}>
            <div className="p-4 bg-gray-50 w-full text-xl rounded-lg flex flex-col gap-8 sm:w-full">
              <h1 className="text-gray-900 font-semibold text-2xl tracking-wider capitalize print:hidden">
                {test.test_name} Report
              </h1>
              <div className="space-y-2">
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider flex items-center space-x-2">
                    <GooglePlayLogo size={18} />

                    <span>App:</span>
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider capitalize">
                    {test.app_slug}
                  </h1>
                </div>

                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider flex items-center space-x-2">
                    <Calendar size={18} />

                    <span>Test Date:</span>
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider">
                    {utcDateToLocal(test.test_date)}
                  </h1>
                </div>

                <div className="flex flex-col  space-y-2 ">
                  <TableView
                    data={test.report}
                    search={false}
                    tableRowComponent={<ProfileTestGridTableRow />}
                    tableHeadings={["Test Name", "Test Value", "Test Note"]}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
type ProfileTestGridTableRowProps = {
  data?: MemberTestReport;
};
export const ProfileTestGridTableRow: React.FC<
  ProfileTestGridTableRowProps
> = ({ data }) => {
  return data ? (
    <tr>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700">
        <div className="flex flex-col">
          <span>{data.name} </span>
        </div>
      </td>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700">
        {data.value}
      </td>

      <td className="capitalize px-6 py-4 text-xl font-medium text-gray-700 truncate">
        {data.note === "" ? "N/A" : data.note.slice(0, 40)[0]}
      </td>
    </tr>
  ) : (
    <tr />
  );
};
