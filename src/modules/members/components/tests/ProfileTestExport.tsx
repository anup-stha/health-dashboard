/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import omit from "lodash/omit";
import moment from "moment";
import React, { useRef } from "react";
import ReactExport from "react-data-export";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/Button";

import { ProfileTestPrint } from "@/modules/members/components/tests/ProfileTestPrint";
import { Member } from "@/modules/members/types";
import { getSubTestList } from "@/modules/members/utils/getSubTestList";
import { utcDateToLocal } from "@/modules/members/utils/utcDateToLocal";

import { MemberTestList, PaginationObject } from "@/types";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface IProfileTestExport {
  testList: { list: MemberTestList[]; pagination: PaginationObject };
  selectedMember: Member;
}

export const ProfileTestExport = ({ testList, selectedMember: currentMember }: IProfileTestExport) => {
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
              temperature: element.temperature,
              test_date: moment(utcDateToLocal(element.test_date)).format("YYYY/MM/DD"),
            },
            ...element.report.map((sub) => ({
              [sub.name]: sub.value,
              note: sub.note.length === 0 ? "N/A" : sub.note.join(" | "),
            }))
          );
        })
      : [];

  return (
    <div className="gap-2 flex">
      <ProfileTestPrint
        test_name={testList.list[0].test_name}
        test={getSubTestList(testList.list)}
        member={currentMember}
        ref={componentRef}
      />
      <Button onClick={handlePrint} size="sm">
        Print
      </Button>
      <ExcelFile element={<Button size="sm">Export to Excel</Button>} filename={testList.list[0].test_name}>
        <ExcelSheet data={excelData} name={testList.list[0].test_name}>
          {Object.keys(omit(excelData[0], "note")).map((element: any, index: number) => {
            return <ExcelColumn key={index} label={element} value={element} />;
          })}
          <ExcelColumn label="Test Note" value="note" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};
