/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 10:57 AM
 *
 *
 */

import create from "zustand";
import { combine, devtools } from "zustand/middleware";

import { OtherFields, OtherFieldsGetResponse, OtherFieldsPostResponse } from "@/types";

const initialState = {
  othersFieldList: {
    data: [] as OtherFields[],
    loading_status: false,
    req_message: "",
  },
};

const store = combine(initialState, (set) => ({
  setOthersFieldList: (listRes: OtherFieldsGetResponse) => {
    set({
      othersFieldList: {
        data: listRes.data,
        loading_status: listRes.status,
        req_message: listRes.message,
      },
    });
  },
  addInFieldList: (detailRes: OtherFieldsPostResponse) => {
    set((state) => ({
      othersFieldList: {
        data: [...state.othersFieldList.data, detailRes.data],
        loading_status: detailRes.status,
        req_message: detailRes.message,
      },
    }));
  },
  updateInFieldList: (detailRes: OtherFieldsPostResponse) => {
    set((state) => ({
      othersFieldList: {
        data: state.othersFieldList.data.map((field) =>
          field.id !== Number(detailRes.data.id) ? field : detailRes.data
        ),
        loading_status: detailRes.status,
        req_message: detailRes.message,
      },
    }));
  },
}));

export const useOtherFieldsStore = create(devtools(store, { name: "other_fields" }));
