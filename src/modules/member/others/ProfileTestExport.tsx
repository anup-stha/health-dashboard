/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/28/22, 11:49 AM
 *
 *
 */

import { GrayButton } from "@/components/Button";
import omit from "lodash/omit";
import React, { useRef } from "react";
import ReactExport from "react-data-export";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { utcDateToLocal } from "@/modules/member/utils/utcDateToLocal";
import { MemberTestList, PaginationObject } from "@/types";
import { ProfileTestPrint } from "@/modules/member/others/ProfileTestPrint";
import { getSubTestList } from "@/modules/member/others/ProfileTestTab";
import { Member } from "@/modules/member/types";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface IProfileTestExport {
  testList: { list: MemberTestList[]; pagination: PaginationObject };
  selectedMember: Member;
}

export const ProfileTestExport = ({
  testList,
  selectedMember: currentMember,
}: IProfileTestExport) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const excelData =
    Object.keys(testList).length !== 0
      ? testList.list.map((element) => {
          return Object.assign(
            {},
            {
              test_name: element.test_name,
              test_app: element.app_slug,
              test_date: moment(utcDateToLocal(element.test_date)).format(
                "YYYY/MM/DD"
              ),
            },
            ...element.report.map((sub) => ({
              [sub.name]: sub.value,
              note: sub.note.length === 0 ? "N/A" : sub.note.join(" | "),
            }))
          );
        })
      : [];

  return (
    <div className="space-x-2 flex">
      <ProfileTestPrint
        test_name={testList.list[0].test_name}
        test={getSubTestList(testList.list)}
        member={currentMember}
        ref={componentRef}
      />
      <GrayButton onClick={handlePrint} buttonSize={"small"}>
        Print
      </GrayButton>
      <ExcelFile
        element={<GrayButton buttonSize={"small"}>Export to Excel</GrayButton>}
        filename={testList.list[0].test_name}
      >
        <ExcelSheet data={excelData} name={testList.list[0].test_name}>
          {Object.keys(omit(excelData[0], "note")).map(
            (element: any, index: number) => {
              return (
                <ExcelColumn key={index} label={element} value={element} />
              );
            }
          )}
          <ExcelColumn label="Test Note" value={"note"} />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};
