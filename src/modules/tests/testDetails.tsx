/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/1/22, 4:55 PM
 *
 *
 */

import { Heading } from "@/components/Headings";

import { TestUpdateZone } from "@/modules/tests/TestUpdateZone";

import { TestModal } from "./testAddModal";
import { TestCard } from "./TestCard";
import { testStore } from "./testStore";
import { TestDeleteZone } from "../roles/others/DeleteZone";

export const TestDetails = () => {
  const { selectedTest } = testStore();

  return (
    <div className="px-10  py-10 overflow-visible sm:p-8 space-y-8">
      <Heading title={selectedTest.name} subtitle={selectedTest.desc} />

      <hr className="border-t-[1px] border-primary_gray-200" />

      <div className="space-y-4">
        <h1 className="text-3xl font-medium text-primary_gray-700">Test Sub Categories</h1>
        <div className="w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
          {selectedTest.sub_categories &&
            selectedTest.sub_categories.map((test) => (
              <div key={test.id}>
                <TestCard id={test.id} name={test.name} desc={test.desc} slug={test.slug} isPublic={test.public} />
              </div>
            ))}
          <TestModal variant="subtest" type="add" selectedTest={selectedTest} />
        </div>
      </div>
      <hr className="border-t-[1px] border-primary_gray-200" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium text-primary_gray-900">Alert Zone</h1>
          <p className="text-lg font-medium text-primary_gray-500">Please be careful with anything you do here</p>
        </div>{" "}
        <TestUpdateZone selectedTest={selectedTest} />
        <TestDeleteZone />
      </div>
    </div>
  );
};
