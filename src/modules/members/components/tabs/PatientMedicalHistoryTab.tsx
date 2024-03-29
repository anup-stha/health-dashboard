/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import omit from "lodash/omit";
import { WarningOctagon } from "phosphor-react";
import React from "react";

import { TableView } from "@/components/Table";

import { PatientMedicalHistoryModal } from "@/modules/members/components/modal/PatientMedicalHistoryEditModal";
import { Member } from "@/modules/members/types";

interface IProfileTestSection {
  selectedMember: Member;
}

export const PatientMedicalHistory = ({ selectedMember }: IProfileTestSection) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <div className="print:hidden space-y-8">
        <div className="flex items-center justify-between">
          <div className="print:hidden">
            <h1 className="text-gray-900 font-medium text-3xl tracking-wider sm:text-2xl">Patient Medical History</h1>
            <h1 className="text-gray-500 font-medium text-lg print:hidden">
              Medical History of Patient taken from Sunya Health Apps
            </h1>
          </div>
          <PatientMedicalHistoryModal selectedMember={selectedMember} />
        </div>

        {selectedMember.medical_history.length !== 0 ? (
          <TableView
            data={selectedMember.medical_history.map((element) => omit(element, ["id", "detail_category_id"]))}
          />
        ) : (
          <div className="flex  items-center text-xl font-medium text-red-400 space-x-2 ">
            <WarningOctagon size={24} /> <span>No Patient Medical Details Found</span>
          </div>
        )}
      </div>
    </div>
  );
};
