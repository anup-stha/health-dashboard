/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 6:53 PM
 *
 *
 */

import React, { useRef } from "react";
import { TestDropdown } from "@/modules/members/profile/TestDropdown";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { utcToZonedTime } from "date-fns-tz";
import { TableView } from "@/components/Table";
import moment from "moment";
import { WarningOctagon } from "phosphor-react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import {
  ProfileTestGridView,
  ProfileTestTableRow,
} from "@/modules/members/table/MemberProfileTestTable";
import { TestLineChart } from "@/components/charts/LineChart";
import Image from "next/image";
import { useMemberTestList } from "@/modules/members/api/hooks/useMemberTestList";
import { Member } from "@/types";
import { useReactToPrint } from "react-to-print";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

type ProfileTestProps = {
  loading?: boolean;
  selectedMember: Member;
};

export const ProfileTestComponent: React.FC<ProfileTestProps> = ({
  loading,
  selectedMember,
}) => {
  const router = useRouter();

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const { selectedTestDetailsInProfile: testDetails, selectedTestInProfile } =
    useMemberStore();

  const {} = useMemberTestList(
    Number(router.query.id),
    Number(selectedTestInProfile.id)
  );

  const subTestDetails =
    Object.keys(testDetails).length !== 0
      ? testDetails.list.map((element) => {
          return Object.assign(
            {},
            {
              app_slug: element.app_slug,
              test_date: element.test_date,

              tests: element.report.map((sub) => ({
                [sub.name]: sub.value,
                [`Note`]: sub.note,
              })),
            }
          );
        })
      : [];

  const chartData =
    Object.keys(testDetails).length !== 0 &&
    testDetails.list.map((element) => {
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

  return loading ? (
    <Loader />
  ) : (
    <div
      className="print:ring-0 print:p-4 w-full bg-white rounded-xl sm:w-full  ring-1 ring-black ring-opacity-10"
      ref={componentRef}
    >
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
          <div className="print:flex hidden flex-col w-full -mb-8">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-900 font-semibold text-4xl tracking-wider">
                  {selectedTestInProfile.name} Report
                </h1>
                {selectedMember && (
                  <div>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider capitalize">
                      Id: {selectedMember.member_code}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider capitalize">
                      Name: {selectedMember.name}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Address: {selectedMember.address}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Address: {selectedMember.gender}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider">
                      Date of birth:{" "}
                      {moment(selectedMember.dob_ad * 1000).format(
                        "DD/MM/YYYY"
                      )}
                    </h1>
                  </div>
                )}
              </div>

              <div className="self-center flex flex-col items-center">
                <Image
                  src="/sunya.svg"
                  layout="fixed"
                  width={220}
                  height={80}
                  objectFit="contain"
                  alt="Profile Image"
                  priority={true}
                />{" "}
                <h1 className="text-slate-900 font-semibold text-xl tracking-wider pt-4 ">
                  Kathmandu, Nepal
                </h1>
                <h1 className="text-slate-900 font-semibold text-xl tracking-wider ">
                  Email: contact@sunya.health
                </h1>
              </div>
            </div>
          </div>
          <TestDropdown />
        </div>
        <div className="space-y-4">
          {Object.keys(testDetails).length !== 0 &&
            Object.keys(result).length !== 0 && (
              <TestLineChart datas={result} />
            )}

          {Object.keys(testDetails).length !== 0 ? (
            <Tab.Group>
              <div className="flex justify-between items-center">
                <Tab.List className="space-x-4 print:hidden">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold"
                          : "py-3 px-10 rounded-sm text-xl text-gray-700 font-semibold hover:bg-gray-200"
                      )
                    }
                  >
                    <div className="">Table</div>
                  </Tab>

                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold"
                          : "py-3 px-10 rounded-sm text-xl  text-gray-700 font-semibold hover:bg-gray-200"
                      )
                    }
                  >
                    Grid
                  </Tab>
                </Tab.List>
                <div
                  className={
                    "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold  print:hidden cursor-pointer"
                  }
                  onClick={handlePrint}
                >
                  Print
                </div>
              </div>
              <hr className="border-t-[1px] border-gray-200 " />

              <Tab.Panels>
                <Tab.Panel>
                  <TableView
                    data={subTestDetails}
                    tableHeadings={[
                      "Test App",
                      "Test Date",
                      "Test Result",
                      "Test Notes",
                    ]}
                    search={false}
                    tableRowComponent={<ProfileTestTableRow />}
                  />
                </Tab.Panel>
              </Tab.Panels>
              <Tab.Panel>
                <ProfileTestGridView testDetails={testDetails} />
              </Tab.Panel>
            </Tab.Group>
          ) : (
            <div className="flex  items-center text-xl font-semibold text-red-400 space-x-2 ">
              <WarningOctagon size={24} /> <span>No Test Details Found</span>
            </div>
          )}
        </div>
        <div className="hidden print:block mt-4 ml-4 w-full font-semibold">
          <div className="flex w-full items-center">
            <div>
              Printed By Sunya Health ({" "}
              <span className="text-green-700">{window.location.hostname}</span>{" "}
              ) on {moment(new Date()).format("MMM Do YYYY")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const utcDateToLocal = (date: Date) => {
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
