/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { MemberTestList } from "@/types";

export const getSubTestList = (testList: MemberTestList[]) => {
  return testList.map((element) => {
    return Object.assign(
      {},
      {
        id: element.id,
        app_slug: element.app_slug,
        test_date: element.test_date,
        temperature: element.temperature,
        test_name: element.test_name,

        tests: element.report.map((sub) => {
          return {
            [sub.name]: sub.value,

            [`Note`]: sub.note,
            unit: sub.unit,
          };
        }),
      }
    );
  });
};
