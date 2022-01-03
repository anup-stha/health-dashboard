/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/3/22, 5:54 PM
 *
 *
 */

/* eslint-disable no-unused-vars */
import dynamic from "next/dynamic";
import * as React from "react";
import { useState } from "react";
import {
  ChartDateTimeData,
  lineChartOptions,
} from "@/components/charts/LineChart/schema/TestLineSchema";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type LineChartProps = {
  datas: ChartDateTimeData;
};

export const TestLineChart: React.FC<LineChartProps> = ({ datas }) => {
  const schema = {
    options: lineChartOptions(datas),
    series: Object.keys(datas).map((key) => ({
      name: key,
      data: datas[key].values,
    })),
  };

  const [state] = useState(schema);

  if (typeof window === undefined) return null;

  return (
    <div className="p-4 sm:px-0 mb-12  shadow-xl ring-1 ring-gray-300/40 rounded-lg print:hidden">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        width="100%"
        height="450"
      />
    </div>
  );
};
