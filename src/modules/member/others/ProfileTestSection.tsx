/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 9:02 PM
 *
 *
 */

import { useTestList } from "@/services/requests/testRequests";
import React, { useEffect, useState } from "react";
import { TestDropdown } from "@/modules/member/others/TestDropdown";
import { Test } from "@/types";
import {
  getChartData,
  ProfileTestTab,
} from "@/modules/member/others/ProfileTestTab";
import { useMemberTestList } from "@/modules/member/api/hooks/useMemberTestList";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { TestLineChart } from "@/components/charts/LineChart";
import { Member } from "@/modules/member/types";
import { testStore } from "@/modules/tests/testStore";

interface IProfileTestSection {
  selectedMember: Member;
}

export const ProfileTestSection = ({ selectedMember }: IProfileTestSection) => {
  const router = useRouter();
  const { isLoading } = useTestList();
  const testList = testStore((state) => state.testList);
  const [selectedTest, setSelectedTest] = useState({} as Test);

  useEffect(() => {
    testList && setSelectedTest(testList[0]);
  }, [testList]);

  const { data: testDetailsList, isLoading: testLoading } = useMemberTestList(
    selectedMember.id,
    Number(selectedTest?.id),
    Number(router.query.page ?? 1)
  );

  const chartData = testDetailsList ? getChartData(testDetailsList.list) : {};

  return !isLoading || testList ? (
    <div className="print:hidden print:p-4 w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className={"p-6 flex flex-col space-y-8 sm:space-y-4"}>
        <div className=" flex items-center justify-between sm:flex-col sm:items-start sm:gap-4">
          <div className="print:hidden">
            <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
              Tests
            </h1>
            <h1 className="text-gray-500 font-medium text-lg print:hidden">
              Please choose a test to show results of that test
            </h1>
          </div>
          <TestDropdown
            testList={testList}
            selectedTest={selectedTest}
            setSelectedTest={setSelectedTest}
          />
        </div>
        <div className="space-y-4">
          {testLoading ? (
            <Loader />
          ) : (
            <>
              {Object.keys(chartData).length !== 0 && (
                <TestLineChart datas={chartData} />
              )}
              <ProfileTestTab testList={testDetailsList} />
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
