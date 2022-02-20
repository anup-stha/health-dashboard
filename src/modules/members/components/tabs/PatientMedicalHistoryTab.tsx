/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:09 PM
 *
 *
 */

import omit from "lodash/omit";
import { WarningOctagon } from "phosphor-react";
import React from "react";

import { TableView } from "@/components/Table";

import { Member } from "@/modules/members/types";

interface IProfileTestSection {
  selectedMember: Member;
}

export const PatientMedicalHistory = ({
  selectedMember,
}: IProfileTestSection) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <div className="print:hidden space-y-8">
        <div className="print:hidden">
          <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
            Patient Medical History
          </h1>
          <h1 className="text-gray-500 font-medium text-lg print:hidden">
            Medical History of Patient taken from Sunya Health Apps
          </h1>
        </div>

        {selectedMember.medical_history.length !== 0 ? (
          <TableView
            data={selectedMember.medical_history.map((element) =>
              omit(element, ["id", "detail_category_id"])
            )}
          />
        ) : (
          <div className="flex  items-center text-xl font-semibold text-red-400 space-x-2 ">
            <WarningOctagon size={24} />{" "}
            <span>No Patient Medical Details Found</span>
          </div>
        )}
      </div>
    </div>
  );
};
