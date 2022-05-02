/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
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

      <hr className="border-t-[1px] border-gray-200" />

      <div className="space-y-4">
        <h1 className="text-3xl font-medium text-gray-700">Test Sub Categories</h1>
        <div className="w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
          {selectedTest.sub_categories &&
            selectedTest.sub_categories.map((test) => (
              <div key={test.id}>
                <TestCard
                  id={test.id}
                  name={test.name}
                  desc={test.desc}
                  slug={test.slug}
                  isPublic={test.public}
                  unit={test.unit}
                />
              </div>
            ))}
          <TestModal variant="subtest" type="add" selectedTest={selectedTest} />
        </div>
      </div>
      <hr className="border-t-[1px] border-gray-200" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Alert Zone</h1>
          <p className="text-lg font-medium text-gray-500">Please be careful with anything you do here</p>
        </div>{" "}
        <TestUpdateZone selectedTest={selectedTest} />
        <TestDeleteZone />
      </div>
    </div>
  );
};
