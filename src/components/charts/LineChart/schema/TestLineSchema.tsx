/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/4/22, 3:09 PM
 *
 *
 */

import moment from "moment";
import { utcDateToLocal } from "@/modules/members/profile/ProfileTestComponent";

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
  values: string[];
  dates: number[];
};

export interface ChartDateTimeData {
  [slug: string]: ChartData;
}

export const lineChartOptions: any = (datas: ChartDateTimeData) => ({
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
    curve: "smooth",
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
    horizontalAlign: "center",
    showForNullSeries: false,
    fontFamily: "Raleway",
    fontWeight: "500",
  },
  dataLabels: {
    enabled: false,
  },

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      colorStops: color?.map((colorEle) => [
        {
          offset: 0,
          color: colorEle,
          opacity: 0.15,
        },
        {
          offset: 100,
          color: "white",
          opacity: 0,
        },
      ]),
    },
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
        return value;
      },
    },
  },
});
