/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { ApexOptions } from "apexcharts";
import omit from "lodash/omit";
import React, { useState } from "react";
import Chart from "react-apexcharts";

type LineChartProps = {
  color?: string[];
  datas: any | any[];
  xAxisType: "numeric" | "datetime" | "category";
  logarithmic?: boolean;
  reversed?: boolean;
  opposite?: boolean;
  curveType?: "smooth" | "straight";
};

export const LineChart: React.FC<LineChartProps> = ({
  color = ["#7358C3", "#FF668F", "primary"],
  datas,
  xAxisType,
  logarithmic = false,
  reversed = false,
  opposite = false,
  curveType = "straight",
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

  const [options] = useState<ApexOptions>({
    chart: {
      id: "area-chart",
      type: "area",
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
      size: 4,
      colors: ["white"],
      fillOpacity: 0,
      strokeWidth: 2,
      strokeColors: color,
    },
    legend: {
      position: "top",
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        colorStops: [
          [
            {
              offset: 0,
              color: color[0],
              opacity: 0.35,
            },
            {
              offset: 100,
              color: "white",
              opacity: 0,
            },
          ],
          [
            {
              offset: 0,
              color: color[1],
              opacity: 0.35,
            },
            {
              offset: 100,
              color: "white",
              opacity: 0,
            },
          ],
          [
            {
              offset: 0,
              color: color[2],
              opacity: 0.35,
            },
            {
              offset: 100,
              color: "white",
              opacity: 0,
            },
          ],
        ],
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

  const [state] = useState({
    series: xAxisType === "datetime" ? [chartData] : chartData,
  });

  return (
    <div className="">
      <Chart options={options} series={state.series} type="area" width="100%" height="400" />
    </div>
  );
};
