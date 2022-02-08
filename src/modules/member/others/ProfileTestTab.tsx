/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/8/22, 12:52 PM
 *
 *
 */

import { Tab } from "@headlessui/react";
import { TableView } from "@/components/Table";
import {
  ProfileTestGridView,
  ProfileTestTableRow,
} from "@/modules/member/others/ProfileTestTableRow";
import React from "react";
import { WarningOctagon } from "phosphor-react";
import { MemberTestList, PaginationObject } from "@/types";
import { ProfileTestExport } from "@/modules/member/others/ProfileTestExport";
import { Member } from "@/modules/member/types";

interface IProfileTestTabProps {
  testList:
    | { list: MemberTestList[]; pagination: PaginationObject }
    | undefined;
  selectedMember: Member;
}

export const ProfileTestTab = ({
  testList,
  selectedMember,
}: IProfileTestTabProps) => {
  const subTestList = testList ? getSubTestList(testList.list) : [];

  const activeClassName =
    "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold";
  const inactiveClassName =
    "py-3 px-10 rounded-sm text-xl text-gray-700 font-semibold hover:bg-gray-200";

  return !testList ? (
    <div className="flex  items-center text-xl font-semibold text-red-400 space-x-2 ">
      <WarningOctagon size={24} /> <span>No Test Details Found</span>
    </div>
  ) : (
    <Tab.Group>
      <div className="flex justify-between items-center">
        <Tab.List className="space-x-4 print:hidden">
          <Tab
            className={({ selected }) =>
              selected ? activeClassName : inactiveClassName
            }
          >
            <div className="">Table</div>
          </Tab>

          <Tab
            className={({ selected }) =>
              selected ? activeClassName : inactiveClassName
            }
          >
            Grid
          </Tab>
        </Tab.List>
        <ProfileTestExport
          testList={testList}
          selectedMember={selectedMember}
        />
      </div>
      <hr className="border-t-[1px] border-gray-200 " />
      {testList && (
        <>
          <Tab.Panels>
            <Tab.Panel>
              <TableView
                data={subTestList}
                tableHeadings={[
                  "Test Date",
                  "Temperature",
                  "Test Result",
                  "Test Notes",
                ]}
                search={false}
                tableRowComponent={<ProfileTestTableRow />}
                paginate={true}
                paginateObject={testList.pagination}
              />
            </Tab.Panel>
          </Tab.Panels>
          <Tab.Panel>
            <ProfileTestGridView testDetails={testList} />
          </Tab.Panel>
        </>
      )}
    </Tab.Group>
  );
};

export const getSubTestList = (testList: MemberTestList[]) => {
  return testList.map((element) => {
    return Object.assign(
      {},
      {
        id: element.id,
        app_slug: element.app_slug,
        test_date: element.test_date,
        temperature: element.temperature,

        tests: element.report.map((sub) => {
          return {
            [sub.name]: sub.value,
            [`Note`]: sub.note,
          };
        }),
      }
    );
  });
};

export const getChartData = (testList: MemberTestList[]) => {
  const chartData = testList.map((element) => {
    return Object.assign(
      {},
      {
        ...element.report.map((sub) => {
          return {
            [sub.slug]: {
              date: element.test_date,
              value: Number(sub.value),
            },
          };
        }),
      }
    );
  });
  const tempData = chartData
    ? chartData.map((element) => Object.values(element))
    : [];
  const initialData: any = [];
  tempData.forEach((element) => initialData.push(...element));

  const result = initialData.reduce((acc: any, curr: any) => {
    const key = Object.keys(curr)[0];
    const accKeys = Object.keys(acc);
    const found = accKeys.filter((element) => element === key)[0];
    if (!found) {
      acc[key] = {
        values: [curr[key].value],
        dates: [curr[key].date],
      };
    } else {
      acc[key] = {
        values: [...acc[key].values, curr[key].value],
        dates: [...acc[key].dates, curr[key].date],
      };
    }

    return acc;
  }, {});

  return result;
};
