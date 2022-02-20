/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 10:56 AM
 *
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";

import { Test } from "@/types";

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

export const testStore = create(devtools(store, { name: "test" }));
