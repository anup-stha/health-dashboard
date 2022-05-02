/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { TestModal } from "@/modules/tests/testAddModal";

import { Test } from "@/types";

type TestUpdateZoneProps = {
  selectedTest: Test;
};

export const TestUpdateZone: React.FC<TestUpdateZoneProps> = ({ selectedTest }) => {
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center lg:w-full">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Edit this test</h1>
        <p className="text-lg font-medium text-gray-500">
          Once you edit a test, you cannot edit this test for 3 days. Please be certain.
        </p>
      </div>
      <TestModal variant="test" type="edit" selectedTest={selectedTest} />
    </div>
  );
};
