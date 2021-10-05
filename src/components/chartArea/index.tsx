import { format, parseISO, subDays } from "date-fns";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  [index: string | number]: string | number;
}

const defaultData: ChartData[] = [];

for (let num = 20; num >= 0; num--) {
  defaultData.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    price: 1 + Math.floor(Math.random() * 20),
  });
}

export interface ChartAreaProps {
  data?: ChartData[];
  color?: string;
  strokeColor?: string;
  strokeWidth?: 1 | 2 | 3 | 4;
  backgroundColor?: string;
  dark?: boolean;
  xUnit?: string;
  width?: string | number;
  height?: string | number;
}

export const ChartArea: React.FC<ChartAreaProps> = ({
  data = defaultData,
  strokeColor,
  strokeWidth = 2,
  backgroundColor,
  dark = false,
  xUnit = "$",
  width = "100%",
  height = 500,
}) => {
  const bgColor = backgroundColor
    ? backgroundColor
    : dark
    ? "bg-gray-900"
    : "bg-white";

  const stroke = strokeColor ? strokeColor : dark ? "#4F46E5" : "#4338CA";
  const xLabel = Object.keys(data[0])[1];
  const yLabel = Object.keys(data[0])[0];

  return (
    <div className={`box-shadow-01 p-8 ${bgColor} rounded-xl`}>
      <ResponsiveContainer width={width} height={height}>
        <AreaChart data={data} className="bg-[#B4764]">
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.6}></stop>
              <stop offset="90%" stopColor={stroke} stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={xLabel}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill="url(#color)"
          />

          <XAxis
            type="category"
            dataKey={yLabel}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickCount={5}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 5 === 0) return format(date, "MMM, d");
              return "";
            }}
          />

          <YAxis
            dataKey={xLabel}
            axisLine={false}
            tickMargin={10}
            tickLine={false}
            tickCount={5}
            tickFormatter={(number) => `${number.toFixed(2)}`}
          />

          <Tooltip content={<CustomTooltip xUnit={xUnit} />} />

          <CartesianGrid opacity={dark ? 0.05 : 0.25} strokeDasharray="3 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, xUnit }: any) => {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyy")}</h4>
        <p>
          {payload[0].value}
          {xUnit}
        </p>
      </div>
    );
  }
  return null;
};
