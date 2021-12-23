/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 7:06 PM
 *
 *
 */

import { Test } from "@/types";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type testStoreStateType = {
  testList: Test[];
  loading: boolean;
  selectedTest: Test;
};

const initialState: testStoreStateType = {
  testList: [],
  loading: false,
  selectedTest: {} as Test,
};

const store = combine(initialState, (set) => ({
  setTestList: (test: Test[]) => {
    set({
      testList: test,
    });
  },
  setSelectedTest: (test: Test) => {
    set({
      selectedTest: test,
    });
  },
  setLoading: (loading: boolean) => {
    set(() => ({ loading }));
  },
}));

export const testStore = create(devtools(store, "test"));
