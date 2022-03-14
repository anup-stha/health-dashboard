/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 11:56 AM
 *
 *
 */

import { ApexOptions } from "apexcharts";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

interface ISubscriptionChart {
  start_date: number;
  end_date: number;
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const SubscriptionChart = ({ start_date, end_date }: ISubscriptionChart) => {
  const start = moment(start_date * 1000);
  const end = moment(end_date * 1000);
  const leftDays = end.diff(new Date(), "days");
  const totalDays = end.diff(start, "days");
  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "65%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,

          dropShadow: {
            enabled: true,
            color: "black",
            opacity: 0.01,
            blur: 4,
          },
        },
        track: {
          background: "#eee",
          strokeWidth: "100%",
          margin: 1, // margin is in pixels
        },

        dataLabels: {
          show: true,

          value: {
            formatter: function () {
              return end.diff(new Date(), "hours") < 0
                ? "0"
                : `${
                    end.diff(new Date(), "days") === 0 ? end.diff(new Date(), "hours") : end.diff(new Date(), "days")
                  }`;
            },
            color: "#555",
            fontSize: "3rem",
            fontWeight: "semibold",
            fontFamily: "Inter",
            show: true,
            offsetY: -18,
          },
          name: {
            offsetY: 28,
            show: true,
            color: "#aaa",
            fontSize: "1.4rem",
            fontFamily: "Raleway",
          },
        },
      },
    },
    fill: {
      colors: ["#16a34a"],
    },
    stroke: {
      lineCap: "butt",
      curve: "smooth",
    },
    series: [(leftDays / totalDays) * 100],
    labels: [
      end.diff(new Date(), "hours") < 0 ? "Expired" : `${end.diff(new Date(), "days") === 0 ? "Hours" : "Days"} Left`,
    ],
  };

  const [options, setOptions] = useState<ApexOptions>(chartOptions);

  useEffect(() => {
    setOptions(chartOptions);
  }, [start_date]);

  return typeof window !== "undefined" ? (
    <Chart options={options} type="radialBar" series={options.series} width="230px" height="230px" />
  ) : null;
};
