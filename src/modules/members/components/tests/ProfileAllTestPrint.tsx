/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import moment from "moment";
import Image from "next/image";
import React, { Fragment } from "react";

import { URINE_ORDER, URINE_TEST } from "@/modules/members/components/tests/ProfileTestTableRow";
import { Member } from "@/modules/members/types";
import { utcDateToLocal } from "@/modules/members/utils/utcDateToLocal";
import { isServer } from "@/services/isServer";

interface PrintTestComponentProps {
  test_name: string;
  test: any;
  member: Member;
}

type PrintProps = React.DetailedHTMLProps<React.AllHTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  PrintTestComponentProps;

export const ProfileAllTestPrint = React.forwardRef<HTMLDivElement, PrintProps>(({ test_name, test, member }, ref) => {
  return (
    <div className="hidden print:flex w-full" ref={ref}>
      <div className="page-header w-full">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-4 pt-2">
              <h1 className="text-gray-900 font-medium text-4xl tracking-wider">Test Report</h1>
              {member && (
                <div>
                  <h1 className="text-gray-700 font-medium text-2xl tracking-wider capitalize">Name: {member.name}</h1>
                  <h1 className="text-gray-700 font-medium text-2xl tracking-wider ">Address: {member.address}</h1>
                  <h1 className="text-gray-700 font-medium text-2xl tracking-wider ">Gender: {member.gender}</h1>
                  <h1 className="text-gray-700 font-medium text-2xl tracking-wider ">Age: {member.age} years</h1>
                  <h1 className="text-gray-700 font-medium text-2xl tracking-wider">
                    Date of birth: {moment(member.dob_ad * 1000).format("DD/MM/YYYY")}
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
              <h1 className="text-slate-900 font-medium text-xl tracking-wider pt-4 ">Kathmandu, Nepal</h1>
              <h1 className="text-slate-900 font-medium text-xl tracking-wider ">Email: contact@sunya.health</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer">
        <hr />
        <div className="flex w-full items-center pt-4 justify-between">
          <div>
            Printed By Sunya Health ( <span className="text-primary-700">{!isServer && window.location.hostname}</span>{" "}
            ) on {moment(new Date()).format("MMM Do YYYY, h:mm:ss A")}
          </div>

          <span>{member.member_code}</span>
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
        <tbody className="w-screen divide-gray-700/20 divide-y-[1px] shadow-E500">
          {Object.keys(test).map((element, index) => (
            <Fragment key={index}>
              <tr className="w-full bg-gray-700">
                <td className="capitalize py-4 text-xl text-white font-medium space-y-2 whitespace-nowrap">
                  {element} Test Report
                </td>
                <td />
                <td />
              </tr>
              <tr>
                <td>
                  <span className="text-gray-600 text-2xl"> Test Date </span>
                </td>
                <td>
                  <span className="text-gray-600 text-2xl"> Temperature </span>
                </td>
                <td>
                  <span className="text-gray-600 text-2xl"> Test Result </span>
                </td>
              </tr>
              {test[element].map((report: Record<any, any>, index: number) => (
                <tr key={index}>
                  <td className="align-top capitalize py-4 text-xl space-y-2 whitespace-nowrap">
                    <div className="">
                      <span className="block">{moment(utcDateToLocal(report.test_date)).format("MM/DD/YYYY")}</span>
                      <span className="block">{moment(utcDateToLocal(report.test_date)).format("h:mm A")}</span>
                    </div>
                  </td>
                  <td className="capitalize py-4 text-xl space-y-2 whitespace-nowrap align-top ">
                    <div className="">
                      <span className="block">
                        {report.temperature} {report.temperature && <>&deg; F</>}{" "}
                      </span>
                    </div>
                  </td>
                  <td className="capitalize py-4 text-xl space-y-2 break-words ">
                    {report.test_name?.toLowerCase() === "urine"
                      ? URINE_ORDER.map((element, index) => {
                          const unit = report.tests.find((test: any) =>
                            Object.keys(test).find((sub_test) => sub_test?.toLowerCase() === element?.toLowerCase())
                          )?.unit;

                          const value = report.tests.find((test: any) =>
                            Object.keys(test).find((sub_test) => sub_test?.toLowerCase() === element?.toLowerCase())
                          )?.[element];

                          return (
                            value?.toLowerCase() !== "n/a" && (
                              <div key={index} className="flex space-x-2 text-gray-700">
                                <span className="font-medium text-gray-500">{URINE_TEST[element]} : </span>
                                <span className="font-medium line-clamp-1">{value}</span>
                                <span className="font-medium line-clamp-1 lowercase">{unit === "n/a" ? "" : unit}</span>
                              </div>
                            )
                          );
                        })
                      : report.tests.map(
                          (value: Record<any, any>, index: number) =>
                            Object.values(value)[0]?.toLowerCase() !== "n/a" && (
                              <div key={index} className="flex flex-col gap-4 text-gray-700">
                                <div className="flex gap-2">
                                  <span className="font-medium text-gray-500">{Object.keys(value)[0]} : </span>
                                  <span className="font-medium line-clamp-1">{Object.values(value)[0]}</span>
                                  <span className="font-medium lowercase line-clamp-1">
                                    {Object.values(value)[2]?.toLowerCase() === "n/a"
                                      ? ""
                                      : Object.values(value)[2]?.toLowerCase()}
                                  </span>
                                </div>

                                {Object.values(value)[1].length !== 0 && (
                                  <div className="flex gap-2">
                                    <span className="font-medium text-gray-500">Notes:</span>
                                    <div className="flex flex-col">
                                      {Object.values(value)[1].map((element: any, index: number) => (
                                        <span key={index} className="line-clamp-2">
                                          {" "}
                                          {element}{" "}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                        )}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

ProfileAllTestPrint.displayName = "ProfileAllTestPrint";
