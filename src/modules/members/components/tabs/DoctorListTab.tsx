/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:29 PM
 *
 */

import React from "react";

import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { PatientTableRow } from "@/modules/doctor/components/table/PatientTableRow";
import { DoctorAssignModal } from "@/modules/members/components/modal/DoctorAssignModal";
import { useGetOrganizationDoctors } from "@/modules/members/hooks/query/AccessorQuery";

interface IDoctorsListTab {
  organization_id: number;
}

export const DoctorListTab = ({ organization_id }: IDoctorsListTab) => {
  const { data } = useGetOrganizationDoctors(organization_id);

  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:justify-start sm:gap-4">
          <div>
            <h1 className="text-3xl font-medium text-gray-800">Doctors List</h1>
            <p className="text-gray-500 font-medium text-lg print:hidden">
              List of All Doctors Assigned To This Organization
            </p>
          </div>

          <DoctorAssignModal />
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
