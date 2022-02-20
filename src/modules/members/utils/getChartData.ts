/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 12:14 PM
 *
 *
 */

import { MemberTestList } from "@/types";

export const getChartData = (testList: MemberTestList[]) => {
  const chartData = testList.map((element) => {
    return Object.assign(
      {},
      {
        ...element.report.map((sub) => {
          return {
            [sub.slug]: {
              date: element.test_date,
              value: Number(sub.value),
            },
          };
        }),
      }
    );
  });
  const tempData = chartData
    ? chartData.map((element) => Object.values(element))
    : [];
  const initialData: any = [];
  tempData.forEach((element) => initialData.push(...element));

  return initialData.reduce((acc: any, curr: any) => {
    const key = Object.keys(curr)[0];
    const accKeys = Object.keys(acc);
    const found = accKeys.filter((element) => element === key)[0];
    if (!found) {
      acc[key] = {
        values: [curr[key].value],
        dates: [curr[key].date],
      };
    } else {
      acc[key] = {
        values: [...acc[key].values, curr[key].value],
        dates: [...acc[key].dates, curr[key].date],
      };
    }

    return acc;
  }, {});
};
