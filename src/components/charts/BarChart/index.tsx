/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 8:11 AM
 *
 *
 */

/* eslint-disable no-unused-vars */
import { ApexOptions } from "apexcharts";
import omit from "lodash/omit";
import * as React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

type BarChartProps = {
  color?: string[];
  datas: any | any[];
  xAxisType?: "numeric" | "datetime" | "category";
  logarithmic?: boolean;
  reversed?: boolean;
  opposite?: boolean;
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

export const BarChart: React.FC<BarChartProps> = ({
  color = ["#003f5c", "#bc5090", "#ffa600", "#58508d", "#ff6361"],
  datas,
  xAxisType = "category",
  logarithmic = false,
  reversed = false,
  opposite = false,
}) => {
  const chartData =
    xAxisType !== "datetime"
      ? datas.map((data: any) => {
          const dataArray: any = [];
          {
            const ommitedObject = omit(data, Object.keys(data)[0]);
            dataArray.push(
              Object.keys(ommitedObject).map((e: any) => ({
                x: e,
                y: ommitedObject[e],
              }))
            );

            return {
              name: data[Object.keys(data)[0]],
              data: dataArray[0],
            };
          }
        })
      : {
          data: datas.map((data: any) => ({
            x: data.date,
            y: data.value,
          })),
        };

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "bar-chart",
      type: "bar",
      zoom: {
        enabled: true,
        type: "x",
      },
    },
    colors: color,

    legend: {
      position: "top",
    },
    fill: {
      type: "",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
      },
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
    series: xAxisType === "datetime" ? [chartData] : chartData,
  });

  return (
    <div className="">
      <Chart options={options} series={state.series} type="bar" width="100%" height="600" />
    </div>
  );
};
