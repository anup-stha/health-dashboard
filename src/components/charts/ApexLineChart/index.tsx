/* eslint-disable no-unused-vars */
import { ApexOptions } from "apexcharts";
import _ from "lodash";
import * as React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { data4 } from "../LineChartVictory/data";

type LineChartProps = {
  color?: string[];
  datas?: any | any[];
  xAxisType?: any;
  logarithmic?: boolean;
  reversed?: boolean;
  opposite?: boolean;
};

type DateData = {
  [key: string]: string | number;
};

export const ApexLineChart: React.FC<LineChartProps> = ({
  color = ["#7358C3", "#FF668F", "green"],
  datas = data4,
  xAxisType = "timescale",
  logarithmic = false,
  reversed = false,
  opposite = false,
}) => {
  const chartData: any = [];
  console.log(datas);
  //   if (xAxisType === "datetime") {
  //     const temp = datas.map((data: DateData[]) => {
  //       const [xkey, yKey] = Object.keys(data[0]);

  //       console.log(xkey, yKey);
  //       const sortedData = data.sort(
  //         (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  //       );

  //       return sortedData.map((element) => ({
  //         x: element[xkey],
  //         y: element[yKey],
  //       }));
  //     });

  //     chartData.push(temp[0], temp[1]);
  //   }

  const chartData1 =
    xAxisType !== "timescale"
      ? datas.map((data: any) => {
          const dataArray: any = [];
          {
            const ommitedObject = _.omit(data, Object.keys(data)[0]);
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
      : datas.map((data: any) => ({
          x: data.date,
          y: data.value,
        }));

  console.log(chartData1);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "area-chart",
      type: "area",
      zoom: {
        enabled: true,
        type: "x",
      },
    },
    colors: color,
    stroke: {
      curve: "straight",
      width: 3,
    },
    markers: {
      shape: "circle",
      size: 6,
      colors: ["white"],
      fillOpacity: 0,
      strokeWidth: 3,
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
        // @ts-ignore: Unreachable code error
        colorStops: [
          [
            {
              offset: 0,
              color: color[0],
              opacity: 0.15,
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
              opacity: 0.15,
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
              opacity: 0.15,
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
  });
  const [state, setState] = useState({
    series: [
      {
        data: chartData1,
      },
    ],
  });

  return (
    <div className="">
      <Chart
        options={options}
        series={state.series}
        type="area"
        width="100%"
        height="400"
      />
    </div>
  );
};

export default ApexLineChart;
