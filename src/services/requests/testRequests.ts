/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 8:57 AM
 *
 *
 */

import { testStore } from "@/modules/tests/testStore";
import {
  AddTestBody,
  AddTestCategoryBody,
  AddTestCategoryResponse,
  AddTestResponse,
  ListTestResponse,
  UpdateTestCategoryBody,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";
import useSWRImmutable from "swr";
import Router from "next/router";

export const getTests = (): Promise<AxiosResponse<ListTestResponse>> => {
  return privateAgent.get("test/categories/");
};

export const listTests = async (url: string) =>
  privateAgent.get<ListTestResponse>(url).then((response) => {
    testStore.getState().setTestList(response.data.data);
    return response.data.data;
  });

export const useTestList = () => useSWRImmutable(`test/categories/`, listTests);

export const addTest = (body: AddTestBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<AddTestResponse>(`test/category/`, {
        ...body,
        public: body.public ? 1 : 0,
      })
      .then((response) => {
        testStore
          .getState()
          .setTestList([...testStore.getState().testList, response.data.data]);
        resolve("Added");
      })
      .catch((error) => reject(error.response))
  );
};

export const updateTest = (id: Number, body: AddTestBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .put<AddTestResponse>(`test/category/${id}`, {
        ...body,
        public: body.public ? 1 : 0,
      })
      .then((response) => {
        Router.replace(`/tests/${response.data.data.name.toLowerCase()}`);
        testStore
          .getState()
          .setTestList(
            testStore
              .getState()
              .testList.map((test) =>
                test.id === response.data.data.id ? response.data.data : test
              )
          );
        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const addTestCategory = (body: AddTestCategoryBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<AddTestCategoryResponse>(`test/subcategory/`, {
        ...body,
        public: body.public ? 1 : 0,
      })
      .then((response) => {
        const subCategories = testStore.getState().selectedTest.sub_categories;
        const newCategory = response.data.data;

        testStore.getState().setSelectedTest({
          ...testStore.getState().selectedTest,
          sub_categories: [...subCategories, newCategory],
        });
        resolve("Added");
      })
      .catch((error) => reject(error.response))
  );
};

export const updateTestCategory = (
  id: number,
  body: UpdateTestCategoryBody
) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .put<AddTestCategoryResponse>(`test/subcategory/${id}`, {
        ...body,
        public: body.public ? 1 : 0,
      })
      .then((response) => {
        const subCategories = testStore.getState().selectedTest.sub_categories;
        const newCategory = response.data.data;
        testStore.getState().setSelectedTest({
          ...testStore.getState().selectedTest,
          sub_categories: subCategories.map((category) =>
            category.id === newCategory.id ? newCategory : category
          ),
        });

        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};
