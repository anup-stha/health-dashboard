/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 3:48 PM
 *
 *
 */

import { testStore } from "./testStore";
import { TestCard } from "./TestCard";
import { TestModal } from "./testAddModal";
import { TestDeleteZone } from "../roles/others/DeleteZone";

export const TestDetails = () => {
  const { selectedTest } = testStore();

  return (
    <div className="px-10 py-10 overflow-visible sm:p-8 space-y-8">
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-5xl font-semibold text-gray-900">
          {selectedTest.name}
        </h1>
        <p className="text-xl font-semibold text-gray-500 w-3/4">
          {selectedTest.desc} A visual acuity test is an eye exam that checks
          how well you see the details of a letter or symbol from a specific
          distance
        </p>
      </div>
      <hr />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Test Sub Categories
        </h1>
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
                />
              </div>
            ))}
          <TestModal type="add" selectedTest={selectedTest} />
        </div>
      </div>
      <hr />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Alert Zone</h1>
          <p className="text-lg font-semibold text-gray-500">
            Please be careful with anything you do here
          </p>
        </div>{" "}
        {/* <UpdateZone idX={selectedTest.id} /> */}
        <TestDeleteZone />
      </div>
    </div>
  );
};
