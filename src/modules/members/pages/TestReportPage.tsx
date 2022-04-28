/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:54 PM
 *
 *
 */

import groupBy from "lodash/groupBy";
import Image from "next/image";
import { WarningOctagon } from "phosphor-react";
import React, { useEffect, useRef } from "react";
import LetteredAvatar from "react-avatar";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { ProfileAllTestPrint } from "@/modules/members/components/tests/ProfileAllTestPrint";
import { ProfileTestTableRow } from "@/modules/members/components/tests/ProfileTestTableRow";
import { useTestReportByDate } from "@/modules/members/hooks/query/useTestReportByDate";
import { useMemberStore } from "@/modules/members/hooks/zustand/useMemberStore";
import { Member } from "@/modules/members/types";

interface IMemberTest {
  current_member: Member;
}

export const TestReportPage = ({ current_member }: IMemberTest) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      start_date: now.toISOString().slice(0, 16),
      end_date: "",
    },
  });

  const watch_start_date = watch("start_date");

  const start_date = useMemberStore((state) => state.test_report.start_date);
  const end_date = useMemberStore((state) => state.test_report.end_date);

  const { data, refetch, isFetching, error } = useTestReportByDate(current_member.id, start_date, end_date);

  useEffect(() => {
    start_date !== 0 && refetch();
  }, [start_date, end_date]);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const subTestDetails =
    data?.data && Object.keys(data.data.data).length !== 0
      ? data.data.data.list.map((element) => {
          return Object.assign(
            {},
            {
              test_date: element.test_date,
              test_name: element.test_name,
              app_slug: element.app_slug,

              tests: element.report.map((sub) => ({
                [sub.name]: sub.value,
                [`Note`]: sub.note,
                unit: sub.unit,
              })),
            }
          );
        })
      : [];

  const subTestGroups = groupBy(subTestDetails, "test_name");

  if (current_member && Object.keys(current_member).length === 0) {
    return <Loader />;
  }

  return (
    <>
      {current_member && (
        <ProfileAllTestPrint test_name="Test Report" test={subTestGroups} member={current_member} ref={componentRef} />
      )}

      <div className="px-10 py-10 overflow-visible sm:p-6">
        <div className="print:hidden relative w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
          <div className="relative w-full h-52 z-0 profile ">
            <Image
              src="/assets/cover-bg.svg"
              layout="fill"
              objectFit="cover"
              objectPosition="left center"
              alt="cover image"
            />
          </div>

          <div className="absolute left-[1.7%] top-40 z-0 flex items-center gap-x-6">
            <div className="ring-4 ring-white rounded-full">
              <LetteredAvatar name={current_member?.name} size="120" round={true} maxInitials={2} />
            </div>
            <div className="flex flex-col mt-10">
              <h1 className="capitalize text-gray-900 font-medium text-3xl tracking-wider sm:text-3xl">
                {current_member?.name}
              </h1>
              <p className="text-gray-500 font-medium text-xl sm:text-lg">{current_member?.email}</p>
            </div>
          </div>
          <div className="mt-36 py-4 px-8 space-y-6">
            <div className="flex flex-col">
              <h1 className="capitalize text-gray-700 font-medium text-3xl tracking-wider sm:text-3xl">
                Patient Test Report
              </h1>
              <p className="text-gray-500 font-medium text-xl sm:text-lg">
                Please choose start date and end date to generate report.
              </p>
            </div>

            <hr />

            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-end">
                <form
                  onSubmit={handleSubmit((values) => {
                    const start_date = +new Date(values.start_date);
                    const end_date = +new Date(values.end_date);

                    useMemberStore.getState().setTestReportDate(start_date / 1000, end_date / 1000);
                  })}
                  className="flex items-end space-x-4"
                >
                  <Input
                    label="Enter Start Date"
                    type="datetime-local"
                    required={false}
                    max={now.toISOString().slice(0, 16)}
                    {...register("start_date")}
                  />
                  <Input
                    label="Enter End Date"
                    type="datetime-local"
                    required={false}
                    min={watch_start_date}
                    max={now.toISOString().slice(0, 16)}
                    {...register("end_date")}
                  />
                  <Button>Search</Button>
                </form>
                {!error && data && (
                  <div className="flex space-x-4">
                    <Button onClick={handlePrint}>Print Report</Button>
                  </div>
                )}
              </div>
            </div>

            {(error || !data) && (
              <div className="flex items-center text-xl font-medium text-red-400 space-x-2 ">
                <WarningOctagon size={24} /> <span>No Details Found</span>
              </div>
            )}

            <div className="flex flex-col space-y-4">
              {!isFetching ? (
                Object.keys(subTestGroups).map((element) => (
                  <div className="flex flex-col space-y-2" key={element}>
                    <TableView
                      data={subTestGroups[element]}
                      tableHeadings={[`${element} Test Date`, "Temperature", `${element} Test Result`]}
                      search={false}
                      tableRowComponent={<ProfileTestTableRow />}
                      loading={isFetching}
                      paginate={false}
                    />
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
