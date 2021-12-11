/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { listTest } from "@/services/requests/testRequests";
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
  getTestListFromServer: async () => {
    testStore.getState().setLoading(true);
    await listTest()
      .then((res) => {
        testStore.getState().setLoading(false);
        testStore.getState().setTestList(res.data.data);
      })
      .catch(() => testStore.getState().setLoading(false));
  },
  setLoading: (loading: boolean) => {
    set(() => ({ loading }));
  },
}));

export const testStore = create(devtools(store, "test"));
