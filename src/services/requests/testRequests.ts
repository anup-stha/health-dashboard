import { testStore } from "@/modules/tests/testStore";
import {
  AddTestBody,
  AddTestCategoryBody,
  AddTestCategoryResponse,
  AddTestResponse,
  ListTestResponse,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

export const listTest = (): Promise<AxiosResponse<ListTestResponse>> => {
  return privateAgent.get("test/categories/");
};

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
