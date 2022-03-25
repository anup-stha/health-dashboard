/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:53 PM
 *
 *
 */

import { Tab } from "@headlessui/react";
import Link from "next/link";
import { WarningOctagon } from "phosphor-react";
import React from "react";

import { Button } from "@/components/Button";
import { TableView } from "@/components/Table";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { ProfileTestExport } from "@/modules/members/components/tests/ProfileTestExport";
import { ProfileTestGridView, ProfileTestTableRow } from "@/modules/members/components/tests/ProfileTestTableRow";
import { Member } from "@/modules/members/types";
import { getSubTestList } from "@/modules/members/utils/getSubTestList";

import { MemberTestList, PaginationObject } from "@/types";

interface IProfileTestTabProps {
  testList: { list: MemberTestList[]; pagination: PaginationObject } | undefined;
  selectedMember: Member;
}

export const ProfileTestTab = ({ testList, selectedMember }: IProfileTestTabProps) => {
  const subTestList = testList ? getSubTestList(testList.list) : [];
  const user = useAuthStore((state) => state.user);

  const activeClassName = "py-3 px-10 rounded-sm text-xl bg-primary_gray-800 text-white font-medium";
  const inactiveClassName = "py-3 px-10 rounded-sm text-xl text-primary_gray-700 font-medium hover:bg-primary_gray-200";

  return !testList ? (
    <div className="flex  items-center text-xl font-medium text-red-400 space-x-2 ">
      <WarningOctagon size={24} /> <span>No Test Details Found</span>
    </div>
  ) : (
    <Tab.Group>
      <div className="flex justify-between items-center sm:flex-col sm:items-start gap-4 ">
        <Tab.List className="space-x-4 print:hidden">
          <Tab className={({ selected }) => (selected ? activeClassName : inactiveClassName)}>
            <div className="">Table</div>
          </Tab>

          <Tab className={({ selected }) => (selected ? activeClassName : inactiveClassName)}>Grid</Tab>
        </Tab.List>
        <div className="flex items-start gap-2">
          <ProfileTestExport testList={testList} selectedMember={selectedMember} />{" "}
          {selectedMember.role && selectedMember.role.slug === "patient" ? (
            user.id === 1 ? (
              <Link href="/members/org_admin/patient/test_report" passHref>
                <Button size="sm">Generate Test Report</Button>
              </Link>
            ) : (
              <Link href="/members/patient/test_report" passHref>
                <Button size="sm">Generate Test Report</Button>
              </Link>
            )
          ) : null}
        </div>
      </div>
      <hr className="border-t-[1px] border-primary_gray-200 " />
      {testList && (
        <>
          <Tab.Panels>
            <Tab.Panel>
              <TableView
                data={subTestList}
                tableHeadings={["Test Date", "Temperature", "Test Result", "Test Notes"]}
                search={false}
                tableRowComponent={<ProfileTestTableRow />}
                paginate={true}
                paginateObject={testList.pagination}
              />
            </Tab.Panel>
          </Tab.Panels>
          <Tab.Panel>
            <ProfileTestGridView testDetails={testList} />
          </Tab.Panel>
        </>
      )}
    </Tab.Group>
  );
};
