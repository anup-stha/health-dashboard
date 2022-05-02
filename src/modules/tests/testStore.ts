/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
