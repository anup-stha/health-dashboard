/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Heading } from "@/components/Headings";

import { TestModal } from "./testAddModal";
import { TestCard } from "./TestCard";
import { testStore } from "./testStore";

export const TestPage = () => {
  const { testList } = testStore();

  return (
    <div className="px-10 py-10 overflow-visible sm:p-8 space-y-8">
      <Heading title="Test" subtitle="Click on any test to view, update or delete test and sub-categories" />
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
        <TestModal type="add" variant="test" />
      </div>
    </div>
  );
};
