/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/11/22, 9:07 AM
 *
 *
 */

import moment from "moment";
import { utcDateToLocal } from "@/modules/members/profile/ProfileTestComponent";
import { ApexOptions } from "apexcharts";

const color = [
  "#8b5cf6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#3b82f6",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
];

type ChartData = {
  values: number[];
  dates: string[];
};

export interface ChartDateTimeData {
  [slug: string]: ChartData;
}

export const lineChartOptions = (datas: ChartDateTimeData): ApexOptions => ({
  chart: {
    id: "line-chart",
    type: "line",
    zoom: {
      enabled: true,
      type: "x",
    },
    animations: {
      enabled: true,
      easing: "linear",
      speed: 200,
      animateGradually: {
        enabled: false,
        delay: 50,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 200,
      },
    },
  },

  colors: color,
  stroke: {
    curve: "smooth",
    width: 3,
  },
  markers: {
    shape: "circle",
    size: 1,
    colors: color,
    fillOpacity: 0,
    strokeWidth: 1,
    strokeColors: color,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    showForNullSeries: false,
    showForSingleSeries: true,
    fontFamily: "Raleway",
    fontWeight: "600",
  },

  dataLabels: {
    enabled: false,
  },

  labels: datas[Object.keys(datas)[0]].dates,
  xaxis: {
    labels: {
      show: true,
      formatter: (date: any) => {
        return moment(utcDateToLocal(new Date(date))).format("MMM Do, h:mm a");
      },
    },
    type: "datetime",
  },

  yaxis: {
    labels: {
      formatter: (value: any) => {
        if (isNaN(value)) return "N/A";
        return `${Math.round(value * 100) / 100}`;
      },
    },
  },

  responsive: [
    {
      breakpoint: 1000,
      options: {
        legend: {
          width: 200,
        },
        xaxis: {
          labels: {
            show: true,
            formatter: (date: any) => {
              return moment(utcDateToLocal(new Date(date))).format("MM/DD");
            },
          },
          type: "datetime",
        },
      },
    },
  ],
});
