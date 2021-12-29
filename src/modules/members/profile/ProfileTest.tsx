/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 11:38 AM
 *
 *
 */

import React from "react";
import { TestDropdown } from "@/modules/members/profile/TestDropdown";
import { memberStore } from "@/modules/members/memberStore";
import { utcToZonedTime } from "date-fns-tz";
import { TableView } from "@/components/Table";
import moment from "moment";
import { GooglePlayLogo, WarningOctagon } from "phosphor-react";
import { MemberTestListData, MemberTestReport } from "@/types";
import { Calendar } from "iconsax-react";
import { Tab } from "@headlessui/react";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

type ProfileTestProps = {
  loading?: boolean;
};
export const ProfileTest: React.FC<ProfileTestProps> = ({ loading }) => {
  const {
    selectedTestDetailsInProfile: testDetails,
    selectedMember,
    selectedTestInProfile,
  } = memberStore();

  const subTestDetails =
    Object.keys(testDetails).length !== 0 &&
    testDetails.list.map((element) => {
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
    });

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="print:ring-0 w-full bg-white rounded-xl sm:w-full  ring-1 ring-black ring-opacity-10">
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
          <div className="print:flex hidden flex-col gap-4">
            <h1 className="text-gray-900 font-semibold text-4xl tracking-wider">
              {selectedTestInProfile.name} Report
            </h1>
            <hr />
            {selectedMember && (
              <div>
                <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
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
                  {moment(selectedMember.dob_ad * 1000).format("DD/MM/YYYY")}
                </h1>
              </div>
            )}
          </div>
          <TestDropdown />
        </div>
        <div className="space-y-4">
          {Object.keys(testDetails).length !== 0 ? (
            <Tab.Group>
              <div className="flex justify-between items-center ">
                <Tab.List className="space-x-4 print:hidden">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold"
                          : "py-3 px-10 rounded-sm text-xl  text-gray-700 font-semibold hover:bg-gray-200"
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
                    "py-3 px-10 rounded-sm text-xl bg-gray-800 text-white font-semibold  print:hidden"
                  }
                  onClick={() => window.print()}
                >
                  Print
                </div>
              </div>
              <hr className="border-t-[1px] border-gray-200" />

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
                    tableRowComponent={<ProfileTestTableRow />}
                  />{" "}
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

type ProfileTestData = {
  app_slug: string;
  test_date: Date;
  tests: { [p: string]: string }[];
};

const ProfileTestTableRow = ({ data }: { data?: ProfileTestData }) => {
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
      <td className="capitalize px-6 py-4 text-xl space-y-2 whitespace-nowrap">
        {data.tests.map((element, index) => (
          <div key={index} className="block text-gray-700">
            <span className="font-medium text-gray-500">
              {Object.keys(element)[0]} :{" "}
            </span>
            <span className="font-semibold">{Object.values(element)[0]}</span>
          </div>
        ))}
      </td>
      <td className="capitalize px-6 py-4 text-xl space-y-2 text-gray-600">
        {data.tests.map((element, index) => (
          <div key={index} className="block text-gray-700">
            <span className="font-medium text-gray-500">
              {Object.keys(element)[1]} :{" "}
            </span>
            <span className="font-semibold w-64">
              {Object.values(element)[1] === ""
                ? "N/A"
                : Object.values(element)[1].slice(0, 50)[0]}
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
              <h1 className="text-gray-900 font-semibold text-2xl tracking-wider capitalize">
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
          <span className="text-gray-500 text-lg">{data.slug}</span>
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
