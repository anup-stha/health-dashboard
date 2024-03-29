/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

/* eslint-disable no-unused-vars */
import dynamic from "next/dynamic";
import * as React from "react";
import { useEffect, useState } from "react";

import { ChartDateTimeData, lineChartOptions } from "@/components/charts/LineChart/schema/TestLineSchema";

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

  const [state, setState] = useState(schema);

  useEffect(() => {
    setState({
      options: lineChartOptions(datas),
      series: Object.keys(datas).map((key) => ({
        name: key,
        data: datas[key].values,
      })),
    });
  }, [datas]);

  if (typeof window === undefined) return null;

  return (
    <div className="p-4 sm:px-0 mb-12 shadow-xl ring-1 ring-gray-300/40 rounded-lg print:hidden">
      <Chart options={state.options} series={state.series} type="line" width="100%" height="450" />
    </div>
  );
};
