/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:53 PM
 *
 *
 */

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { TestLineChart } from "@/components/charts/LineChart";
import { Loader } from "@/components/Loader";

import { ProfileTestDropdown } from "@/modules/members/components/dropdown/ProfileTestDropdown";
import { ProfileTestTab } from "@/modules/members/components/tests/ProfileTestTab";
import { useMemberTestList } from "@/modules/members/hooks/query/useMemberTestList";
import { Member } from "@/modules/members/types";
import { getChartData } from "@/modules/members/utils/getChartData";
import { testStore } from "@/modules/tests/testStore";
import { useTestList } from "@/services/requests/testRequests";

import { Test } from "@/types";

interface IProfileTestSection {
  selectedMember: Member;
}

const Tab = ({ selectedMember }: IProfileTestSection) => {
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

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      {!isLoading || testList ? (
        <div className="print:hidden">
          <div className="flex flex-col space-y-8 sm:space-y-4">
            <div className=" flex items-center justify-between sm:flex-col sm:items-start sm:gap-4">
              <div className="print:hidden">
                <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
                  Tests
                </h1>
                <h1 className="text-gray-500 font-medium text-lg print:hidden">
                  Please choose a test to show results of that test
                </h1>
              </div>
              <ProfileTestDropdown
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
                  <ProfileTestTab
                    testList={testDetailsList}
                    selectedMember={selectedMember}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const TestTab = React.memo(Tab);
