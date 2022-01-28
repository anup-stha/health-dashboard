/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/28/22, 12:01 PM
 *
 *
 */

import { Member } from "@/modules/member/types";
import React, { Fragment } from "react";
import moment from "moment";
import Image from "next/image";
import { isServer } from "@/services/isServer";
import { utcDateToLocal } from "@/modules/member/utils/utcDateToLocal";

interface PrintTestComponentProps {
  test_name: string;
  test: any;
  member: Member;
}

type PrintProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  PrintTestComponentProps;

export const ProfileAllTestPrint = React.forwardRef<HTMLDivElement, PrintProps>(
  ({ test_name, test, member }, ref) => {
    return (
      <div className="hidden print:flex w-full" ref={ref}>
        <div className="page-header w-full">
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-4 pt-2">
                <h1 className="text-gray-900 font-semibold text-4xl tracking-wider">
                  Test Report
                </h1>
                {member && (
                  <div>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider capitalize">
                      Name: {member.name}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Address: {member.address}
                    </h1>
                    <h1 className="text-gray-700 font-semibold text-2xl tracking-wider ">
                      Gender: {member.gender}
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
          </div>
        </div>
        <div className="page-footer">
          <hr />
          <div className="flex w-full items-center pt-4 justify-between">
            <div>
              Printed By Sunya Health ({" "}
              <span className="text-green-700">
                {!isServer && window.location.hostname}
              </span>{" "}
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
                <tr className={"w-full bg-gray-700"}>
                  <td className="capitalize py-4 text-xl text-white font-semibold space-y-2 whitespace-nowrap">
                    {element} Test Report
                  </td>
                  <td />
                  <td />
                </tr>
                {test[element].map(
                  (report: Record<any, any>, index: number) => (
                    <tr key={index}>
                      <td className="align-top capitalize py-4 text-xl space-y-2 whitespace-nowrap">
                        <div className="">
                          <span className="block">
                            {moment(utcDateToLocal(report.test_date)).format(
                              "MM/DD/YYYY"
                            )}
                          </span>
                          <span className={"block"}>
                            {moment(utcDateToLocal(report.test_date)).format(
                              "h:mm A"
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="capitalize py-4 text-xl space-y-2 break-words ">
                        {report.tests.map((value: any, index: number) => (
                          <div key={index} className="text-gray-700">
                            <span className="inline font-medium text-gray-500 block">
                              {Object.keys(value)[0]} :{" "}
                            </span>
                            <span className="inline font-semibold block text-lg ">
                              {Object.values(value)[0] as any}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="capitalize py-4 text-xl space-y-2 text-gray-600 break-words">
                        {report.tests.map((element: any, index: any) => {
                          const note = Object.values(element)[1] as string[];
                          return (
                            <div key={index} className="text-gray-700 ">
                              <span className="font-medium text-gray-500 inline">
                                {Object.keys(element)[1]} :{" "}
                              </span>
                              <span className="font-semibold block text-lg inline">
                                {note.length === 0
                                  ? "N/A"
                                  : note.map((element: any, index: number) => (
                                      <span
                                        key={index}
                                        className="line-clamp-1 block"
                                      >
                                        {" "}
                                        {element}{" "}
                                      </span>
                                    ))}
                              </span>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  )
                )}
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
  }
);

ProfileAllTestPrint.displayName = "ProfileAllTestPrint";
