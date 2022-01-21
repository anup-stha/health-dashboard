/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/21/22, 10:07 PM
 *
 *
 */

import { useForm } from "react-hook-form";
import { PrimaryInput } from "@/components/Input";
import { GrayButton, PrimaryButton } from "@/components/Button";
import { useTestReportByDate } from "@/modules/members/api/hooks/useTestReportByDate";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";
import React, { useEffect, useRef } from "react";
import { TableView } from "@/components/Table";
import { ProfileTestTableRow } from "@/modules/members/table/MemberProfileTestTable";
import { PrintTestComponent } from "@/modules/members/profile/ProfileTestComponent";
import { useReactToPrint } from "react-to-print";
import groupBy from "lodash/groupBy";
import { Loader } from "@/components/Loader";
import { useMembersList } from "@/modules/members/api/hooks/useMembersList";
import LetteredAvatar from "react-avatar";
import { WarningOctagon } from "phosphor-react";

export const MemberTest = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();

  const start_date = useMemberStore((state) => state.test_report.start_date);
  const end_date = useMemberStore((state) => state.test_report.end_date);
  const { isLoading } = useMembersList(
    5,
    Number(router.query.pat_id),
    Number(router.query.p_page)
  );

  const selectedMember = useMemberStore((state) => state.selectedMember);

  console.log(start_date, end_date);

  const { data, refetch, isFetching, error } = useTestReportByDate(
    Number(router.query.pat_id),
    start_date,
    end_date
  );

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
              })),
            }
          );
        })
      : [];

  const subTestGroups = groupBy(subTestDetails, "test_name");

  return !isLoading ? (
    <>
      {selectedMember && (
        <PrintTestComponent
          test_name={"Test Report"}
          test={subTestDetails}
          member={selectedMember}
          ref={componentRef}
        />
      )}

      <div className="px-10 py-10 overflow-visible sm:p-6">
        <div className="print:hidden relative w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
          <div className="relative w-full h-52 z-0 profile" />

          <div className="absolute left-[1.7%] top-40 z-0 flex items-center gap-x-6">
            <div className="ring-4 ring-white rounded-full">
              <LetteredAvatar
                name={selectedMember?.name}
                size="120"
                round={true}
                maxInitials={2}
              />
            </div>
            <div className="flex flex-col mt-10">
              <h1 className="capitalize text-gray-900 font-semibold text-3xl tracking-wider sm:text-3xl">
                {selectedMember?.name}
              </h1>
              <p className="text-gray-500 font-semibold text-xl sm:text-lg">
                {selectedMember?.email}
              </p>
            </div>
          </div>
          <div className="mt-36 py-4 px-8 space-y-6">
            <div className="flex flex-col">
              <h1 className="capitalize text-gray-700 font-semibold text-3xl tracking-wider sm:text-3xl">
                Patient Test Report
              </h1>
              <p className="text-gray-500 font-semibold text-xl sm:text-lg">
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

                    useMemberStore
                      .getState()
                      .setTestReportDate(start_date / 1000, end_date / 1000);
                  })}
                  className="flex items-end space-x-4"
                >
                  <PrimaryInput
                    label="Enter Start Date"
                    type="datetime-local"
                    required={true}
                    {...register("start_date")}
                  />
                  <PrimaryInput
                    label="Enter End Date"
                    type="datetime-local"
                    required={false}
                    {...register("end_date")}
                  />
                  <PrimaryButton className="px-12 py-[1.05rem] text-xl font-semibold">
                    Search
                  </PrimaryButton>
                </form>
                {!error && data && (
                  <div className="flex space-x-4">
                    <GrayButton onClick={handlePrint}>Print Report</GrayButton>
                  </div>
                )}
              </div>
            </div>

            {(error || !data) && (
              <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
                <WarningOctagon size={24} /> <span>No Details Found</span>
              </div>
            )}

            <div className="flex flex-col space-y-4">
              {!isFetching ? (
                Object.keys(subTestGroups).map((element) => (
                  <div className="flex flex-col space-y-2" key={element}>
                    <TableView
                      data={subTestGroups[element]}
                      tableHeadings={[
                        "Test Name",
                        `${element} Test Date`,
                        `${element} Test Result`,
                        `${element} Test Notes`,
                      ]}
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
  ) : (
    <Loader />
  );
};
