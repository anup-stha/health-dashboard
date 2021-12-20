/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 3:57 PM
 *
 *
 */

import React from "react";
import { TestDropdown } from "@/modules/members/profile/TestDropdown";
import { memberStore } from "@/modules/members/memberStore";
import { utcToZonedTime } from "date-fns-tz";
import { TableView } from "@/components/Table";
import { Calendar, GooglePlayLogo, WarningOctagon } from "phosphor-react";
import _ from "lodash";

export const ProfileTest = () => {
  const { selectedTestDetailsInProfile: testDetails } = memberStore();

  return (
    <div className=" w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className={"p-6 flex flex-col space-y-8"}>
        <div className=" flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
              Tests
            </h1>
            <h1 className="text-gray-500 font-medium text-lg sm:text-2xl">
              Please choose a test to show results of that test
            </h1>
          </div>

          <TestDropdown />
        </div>
        <div className={"grid grid-cols-2 gap-8 items-stretch justify-stretch"}>
          {Object.keys(testDetails).length !== 0 &&
          testDetails.list.length !== 0 ? (
            testDetails.list.map((test) => (
              <div className="flex items-stretch" key={test.id}>
                <div className="p-6 bg-gray-50 w-full text-xl rounded-lg flex flex-col gap-8 sm:w-full">
                  <h1 className="text-gray-900 font-semibold text-2xl tracking-wider sm:text-2xl capitalize">
                    {test.test_name} Report
                  </h1>
                  <div className="space-y-2 px-4">
                    <div className="flex space-x-4 items-center">
                      <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl flex items-center space-x-2">
                        <GooglePlayLogo size={18} />

                        <span>App:</span>
                      </p>
                      <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl capitalize">
                        {test.app_slug}
                      </h1>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl flex items-center space-x-2">
                        <Calendar size={18} />

                        <span>Test Date:</span>
                      </p>
                      <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                        {utcDateToLocal(test.test_date)}
                      </h1>
                    </div>

                    <div className="flex flex-col  space-y-2 ">
                      <TableView
                        data={test.report.map((element) =>
                          _.omit(element, "id")
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex  items-center text-xl font-semibold text-red-400 space-x-2 ">
              <WarningOctagon size={24} /> <span>No Test Details Found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const utcDateToLocal = (date: Date) => {
  // eslint-disable-next-line new-cap
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    return utcToZonedTime(
      new Date(date).getTime() * 1000,
      timezone
    ).toLocaleString();
  } catch {
    return "Not Available";
  }
};
