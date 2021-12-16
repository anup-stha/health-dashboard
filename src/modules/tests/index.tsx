/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:03 PM
 *
 *
 */

import { TestModal } from "./testAddModal";
import { TestCard } from "./TestCard";
import { testStore } from "./testStore";

export const TestPage = () => {
  const { testList } = testStore();

  return (
    <div className="px-10 py-10 overflow-visible sm:p-8 space-y-8">
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-5xl font-semibold text-gray-900">Test</h1>
        <p className="text-xl font-semibold text-gray-500">
          Click on any test to view, update or delete test and sub-categories
        </p>
      </div>
      <div className="w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
        {testList.map((test) => (
          <div key={test.id}>
            <TestCard
              id={test.id}
              name={test.name}
              desc={test.desc}
              slug={test.slug}
              isPublic={test.public}
              subCategories={test.sub_categories}
            />
          </div>
        ))}
        <TestModal type="add" variant={"test"} />
      </div>
    </div>
  );
};
