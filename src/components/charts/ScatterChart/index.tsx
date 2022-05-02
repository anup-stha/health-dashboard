/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

/* eslint-disable no-unused-vars */
import { ApexOptions } from "apexcharts";
import * as React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

import { scatterDateData } from "../../data";

type LineChartProps = {
  color?: string[];
  datas?: any | any[];
  xAxisType?: "numeric" | "datetime" | "category";
  logarithmic?: boolean;
  reversed?: boolean;
  opposite?: boolean;
  curveType?: "smooth" | "straight";
};

// type xyDataType = {
//   x: string | Date;
//   y: number;
// };

// type DataType = {
//   name: string;
//   data: xyDataType[];
// };

// type ChartDataType =xyDataType | DataType | any[]

export const ScatterChart: React.FC<LineChartProps> = ({
  color = ["#003f5c", "#bc5090", "#ffa600", "#58508d", "#ff6361"],
  datas = scatterDateData,
  xAxisType = "datetime",
  logarithmic = false,
  reversed = false,
  opposite = false,
  curveType = "straight",
}) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "scatter-chart",
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    colors: color,
    stroke: {
      curve: curveType,
      width: 3,
    },
    markers: {
      shape: "circle",
      size: 6,
      colors: color,
      fillOpacity: 1,
      strokeWidth: 0,
      strokeColors: color,
    },
    legend: {
      position: "top",
    },

    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: xAxisType,
    },
    yaxis: {
      logarithmic,
      reversed,
      opposite,
    },
    // title: {
    //   text: "Line Chart",
    // },
  });

  const [state, setState] = useState({
    series: datas,
  });

  return (
    <div className="">
      <Chart options={options} series={state.series} type="scatter" width="100%" height="400" />
    </div>
  );
};
