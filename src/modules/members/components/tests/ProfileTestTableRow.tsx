/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 12:19 PM
 *
 *
 */

import { Calendar } from "iconsax-react";
import moment from "moment";
import { GooglePlayLogo, Thermometer } from "phosphor-react";
import React from "react";

import { TableView } from "@/components/Table";

import { utcDateToLocal } from "@/modules/members/utils/utcDateToLocal";
import { isValidHttpUrl } from "@/utils/isValidHttpUrl";

import { MemberTestListData, MemberTestReport } from "@/types";

export const URINE_ORDER = [
  "uro",
  "bil",
  "ket",
  "cre",
  "blo",
  "pro",
  "alb",
  "nit",
  "leu",
  "glu",
  "sg",
  "ph",
  "vc",
  "ca",
];

export const URINE_TEST: { [key: string]: string } = {
  uro: "Urobilinogen",
  bil: "Bilirubin",
  ket: "Ketone",
  cre: "Creatinine",
  blo: "Blood",
  pro: "Protein",
  alb: "Micro Albumin",
  nit: "Nitrite",
  leu: "Leukocytes",
  glu: "Glucose",
  sg: "Specific Gravity",
  ph: "ph",
  vc: "Ascorbate",
  ca: "Calcium",
};

type ProfileTestData = {
  id: number;
  app_slug: string;
  test_name: string;
  test_date: Date;
  temperature: null | string;
  tests: { [p: string]: any }[];
};
export const ProfileTestTableRow = ({ data }: { data?: ProfileTestData }) => {
  console.log(data);

  return data ? (
    <tr key={data.id}>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700 align-top">
        <div className="flex flex-col space-y-2">
          <span>{moment(utcDateToLocal(data.test_date)).format("MM/DD/YYYY")}</span>

          <span>{moment(utcDateToLocal(data.test_date)).format("h:mm A")}</span>
        </div>
      </td>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700 align-top">
        {data.temperature} {data.temperature && <>&deg; F</>}
      </td>
      <td className="capitalize px-6 py-4 text-xl space-y-2 whitespace-nowrap align-top">
        {data.test_name.toLowerCase() === "urine"
          ? URINE_ORDER.map((element, index) => {
              const unit = data.tests.find((test) =>
                Object.keys(test).find((sub_test) => sub_test.toLowerCase() === element.toLowerCase())
              )?.unit;

              return (
                <div key={index} className="flex space-x-2 text-gray-700">
                  <span className="font-medium text-gray-500">{URINE_TEST[element]} : </span>
                  <span className="font-medium line-clamp-1">
                    {
                      data.tests.find((test) =>
                        Object.keys(test).find((sub_test) => sub_test.toLowerCase() === element.toLowerCase())
                      )?.[element]
                    }
                  </span>
                  <span className="font-medium line-clamp-1 lowercase">{unit === "n/a" ? "" : unit}</span>
                </div>
              );
            })
          : data.tests.map((element, index) => {
              if (isValidHttpUrl(Object.values(element)[0])) {
                return (
                  <div key={index} className="flex space-x-2">
                    <a
                      href={Object.values(element)[0]}
                      className="font-medium text-gray-600 cursor-pointer underline hover:text-gray-800"
                    >
                      Report Link
                    </a>
                  </div>
                );
              }

              return (
                <div key={index} className="flex flex-col gap-4 text-gray-700">
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-500">{Object.keys(element)[0]} : </span>
                    <span className="font-medium line-clamp-1">{Object.values(element)[0]}</span>
                    <span className="font-medium lowercase line-clamp-1">
                      {Object.values(element)[2].toLowerCase() === "n/a" ? "" : Object.values(element)[2].toLowerCase()}
                    </span>
                  </div>

                  {Object.values(element)[1].length !== 0 && (
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-500">Notes:</span>
                      <div className="flex flex-col">
                        {Object.values(element)[1].map((element: any, index: number) => (
                          <span key={index} className="line-clamp-2">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </td>
    </tr>
  ) : (
    <tr />
  );
};
type ProfileTestGridViewProps = {
  testDetails: MemberTestListData;
};
export const ProfileTestGridView: React.FC<ProfileTestGridViewProps> = ({ testDetails }) => {
  return (
    <div className="grid grid-cols-2 gap-8 items-stretch justify-stretch sm:grid-cols-1 sm:gap-6 print:grid-cols-1">
      {Object.keys(testDetails).length !== 0 &&
        testDetails.list.length !== 0 &&
        testDetails.list.map((test) => (
          <div className="flex items-stretch" key={test.id}>
            <div className="p-4 bg-gray-50 w-full text-xl rounded-lg flex flex-col gap-8 sm:w-full">
              <h1 className="text-gray-900 font-medium text-2xl tracking-wider capitalize print:hidden">
                {test.test_name} Report
              </h1>
              <div className="space-y-2">
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-medium text-xl tracking-wider flex items-center space-x-2">
                    <GooglePlayLogo size={18} />

                    <span>App:</span>
                  </p>
                  <h1 className="text-gray-500 font-medium text-xl tracking-wider capitalize">{test.app_slug}</h1>
                </div>

                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-medium text-xl tracking-wider flex items-center space-x-2">
                    <Calendar size={18} />

                    <span>Test Date:</span>
                  </p>
                  <h1 className="text-gray-500 font-medium text-xl tracking-wider">{utcDateToLocal(test.test_date)}</h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-medium text-xl tracking-wider flex items-center space-x-2">
                    <Thermometer size={18} weight="duotone" />

                    <span>Temperature:</span>
                  </p>
                  <h1 className="text-gray-500 font-medium text-xl tracking-wider">{test?.temperature}</h1>
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
export const ProfileTestGridTableRow: React.FC<ProfileTestGridTableRowProps> = ({ data }) => {
  return data ? (
    <tr>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700">
        <div className="flex flex-col">
          <span>{data.name} </span>
        </div>
      </td>
      <td className="capitalize px-6 py-4 text-xl whitespace-nowrap font-medium text-gray-700">
        {isValidHttpUrl(data.value) ? (
          <a href={data.value} className="font-medium text-gray-600 cursor-pointer underline hover:text-gray-800">
            Report Link
          </a>
        ) : (
          data.value
        )}
      </td>

      <td className="capitalize px-6 py-4 text-xl font-medium text-gray-700 truncate">
        {data.note.length === 0 ? "N/A" : data.note.map((note, index) => <span key={index}> {note} </span>)}
      </td>
    </tr>
  ) : (
    <tr />
  );
};
