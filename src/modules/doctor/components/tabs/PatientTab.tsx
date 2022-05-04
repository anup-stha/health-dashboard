/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 4:47 PM
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { PatientTableRow } from "@/modules/doctor/components/table/PatientTableRow";
import { DoctorQuery } from "@/modules/doctor/hooks/query/DoctorQuery";

interface IPatientTabProps {
  parent_member_id: number;
}

export const PatientTab = ({ parent_member_id }: IPatientTabProps) => {
  const router = useRouter();
  const { data } = DoctorQuery.useGetPatients({
    patient_parent_id: parent_member_id,
    page: Number(router?.query?.page ?? 1),
  });

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:justify-start sm:gap-4">
          <div>
            <h1 className="text-3xl font-medium text-gray-800">Patients List</h1>
            <p className="text-gray-500 font-medium text-lg print:hidden">List of All Patients in this Organization.</p>
          </div>
        </div>
        {data ? (
          <TableView
            data={data?.list}
            tableHeadings={["Member Name", "Code", "Phone Number", "Address", ""]}
            searchTerms={["name", "member_code"]}
            tableRowComponent={<PatientTableRow />}
            loading={!data}
            paginate={true}
            paginateObject={data.pagination}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
