/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/16/21, 8:13 PM
 *
 *
 */

import { TestModal } from "@/modules/tests/testAddModal";
import { Test } from "@/types";

type TestUpdateZoneProps = {
  selectedTest: Test;
};

export const TestUpdateZone: React.FC<TestUpdateZoneProps> = ({
  selectedTest,
}) => {
  return (
    <div className="bg-white shadow-E500 w-2/3 py-8 px-8 rounded-sm flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit this test</h1>
        <p className="text-lg font-semibold text-gray-500">
          Once you edit a test, you cannot edit this test for 3 days. Please be
          certain.
        </p>
      </div>
      <TestModal variant={"test"} type="edit" selectedTest={selectedTest} />
    </div>
  );
};
