/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/10/22, 10:44 PM
 *
 *
 */

import React, { useEffect, useRef } from "react";
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

import ReactExport from "react-data-export";
import { GrayButton } from "@/components/Button";
import omit from "lodash/omit";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  const tableRef = useRef<HTMLDivElement>(null);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const { selectedTestDetailsInProfile: testDetails, selectedTestInProfile } =
    useMemberStore();

  const { isFetching } = useMemberTestList(
    Number(router.query.id),
    Number(selectedTestInProfile.id),
    Number(router.query.page ?? 1)
  );

  useEffect(() => {
    router.query.page &&
      Object.keys(selectedTestInProfile).length !== 0 &&
      window.scroll(0, 567);
  }, [router]);

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

  const excelData =
    Object.keys(testDetails).length !== 0
      ? testDetails.list.map((element) => {
          return Object.assign(
            {},
            {
              test_name: element.test_name,
              test_app: element.app_slug,
              test_date: moment(utcDateToLocal(element.test_date)).format(
                "YYYY/MM/DD"
              ),
            },
            ...element.report.map((sub) => ({
              [sub.name]: sub.value,
              note: sub.note.length === 0 ? "N/A" : sub.note.join(" | "),
            }))
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
    <>
      <PrintTestComponent
        test_name={selectedTestInProfile.name}
        test={subTestDetails}
        member={selectedMember}
        ref={componentRef}
      />
      <div
        className="print:hidden print:p-4 w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10"
        ref={tableRef}
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

                  <div className="space-x-2 flex">
                    <GrayButton onClick={handlePrint} buttonSize={"small"}>
                      Print
                    </GrayButton>
                    <ExcelFile
                      element={
                        <GrayButton buttonSize={"small"}>
                          Export to Excel
                        </GrayButton>
                      }
                      filename={selectedTestInProfile.name}
                    >
                      <ExcelSheet
                        data={excelData}
                        name={selectedTestInProfile.name}
                      >
                        {Object.keys(omit(excelData[0], "note")).map(
                          (element: any, index: number) => {
                            return (
                              <ExcelColumn
                                key={index}
                                label={element}
                                value={element}
                              />
                            );
                          }
                        )}
                        <ExcelColumn label="Test Note" value={"note"} />
                      </ExcelSheet>
                    </ExcelFile>
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
                      loading={isFetching}
                      paginate={true}
                      paginateObject={testDetails.pagination}
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
        </div>
      </div>
    </>
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
  tests: { [p: string]: any }[];
};

type PrintTestComponentProps = {
  test_name: string;
  test: ProfileTestData[];
  member: Member;
};

type PrintProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  PrintTestComponentProps;

const PrintTestComponent = React.forwardRef<HTMLDivElement, PrintProps>(
  ({ test_name, test, member }, ref) => {
    return (
      <div className="hidden print:flex w-full" ref={ref}>
        <div className="page-header w-full">
          <div className="flex flex-col space-y-8 w-full">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-900 font-semibold text-4xl tracking-wider">
                  {test_name} Report
                </h1>
                {member && (
                  <div>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider capitalize">
                      Id: {member.member_code}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider capitalize">
                      Name: {member.name}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Address: {member.address}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Address: {member.gender}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider">
                      Date of birth:{" "}
                      {moment(member.dob_ad * 1000).format("DD/MM/YYYY")}
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
            <div className="bg-gray-100 w-full mr-4 grid grid-cols-4">
              <span className="px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Test App
              </span>
              <span className="px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Test Date
              </span>
              <span className="px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Test Result
              </span>
              <th className="px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">
                Test Notes
              </th>
            </div>
          </div>
        </div>

        <div className="page-footer">
          <div className="flex w-full items-center">
            <div>
              Printed By Sunya Health ({" "}
              <span className="text-green-700">{window.location.hostname}</span>{" "}
              ) on {moment(new Date()).format("MMM Do YYYY")}
            </div>
          </div>
        </div>

        <table className="w-full table-fixed">
          <thead className="">
            <tr>
              <td>
                <div className="page-header-space" />
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 w-screen">
            {test.map((data, index) => (
              <tr key={index} className="w-full">
                <td className="capitalize py-4 text-xl space-y-2 whitespace-nowrap ">
                  {data.app_slug}
                </td>
                <td className="capitalize py-4 text-xl space-y-2 whitespace-nowrap ">
                  <div className="">
                    <span className="block">
                      {moment(utcDateToLocal(data.test_date)).format(
                        "MM/DD/YYYY"
                      )}
                    </span>
                    <span className={"block"}>
                      {moment(utcDateToLocal(data.test_date)).format("h:mm A")}
                    </span>
                  </div>
                </td>
                <td className="capitalize py-4 text-xl space-y-2 break-words ">
                  {data.tests.map((element, index) => (
                    <div key={index} className="text-gray-700">
                      <span className="inline font-medium text-gray-500 block">
                        {Object.keys(element)[0]} :{" "}
                      </span>
                      <span className="inline font-semibold block text-lg ">
                        {Object.values(element)[0]}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="capitalize py-4 text-xl space-y-2 text-gray-600 break-words">
                  {data.tests.map((element, index) => (
                    <div key={index} className="text-gray-700 ">
                      <span className="font-medium text-gray-500 inline">
                        {Object.keys(element)[1]} :{" "}
                      </span>
                      <span className="font-semibold block text-lg inline">
                        {Object.values(element)[1].length === 0
                          ? "N/A"
                          : Object.values(element)[1].map(
                              (element: any, index: number) => (
                                <span
                                  key={index}
                                  className="line-clamp-1 block"
                                >
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
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="page-footer-space" />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
);

PrintTestComponent.displayName = "PrintTestComponent";
