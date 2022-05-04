/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 3:10 PM
 *
 */

import React from "react";

import { Heading } from "@/components/Headings";
import { Loader } from "@/components/Loader";
import { TableView } from "@/components/Table";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { DoctorTableRow } from "@/modules/doctor/components/table/DoctorTableRow";
import { DoctorQuery } from "@/modules/doctor/hooks/query/DoctorQuery";

export const OrganizationListPage = () => {
  const user = useAuthStore.getState().user;

  const { data } = DoctorQuery.useGetOrganization(user?.id ?? 0);

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <Heading title="Organizations" subtitle="List of all organizations you can access in a tabulated view." />
        </div>
        {data ? (
          <TableView
            data={data}
            tableHeadings={["Organization Name", "Organization Code", "Verified", "Phone Number", "Address", ""]}
            searchTerms={["name", "member_code"]}
            tableRowComponent={<DoctorTableRow />}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
