import { subDays } from "date-fns/esm";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import * as React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from "types";

const defaultData: ChartData[] = [];
for (let num = 10; num >= 0; num--) {
  defaultData.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    pu: num * Math.random(),
    pv: num * Math.random(),
    price: num,
  });
}

const LineColor = ["#4F46E5", "#BE185D"];
const defaultFormatter = (str: any) => {
  const date = parseISO(str);
  if (date.getDate() % 5 === 0) return format(date, "MMM, d");
  return "";
};

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
  reverse?: boolean;
  xLabelFormatter?: (value: any) => string;
  yLabelFormatter?: (value: any) => string;
}

export const ChartBar: React.FC<ChartAreaProps> = ({
  data = defaultData,
  strokeColor,
  strokeWidth = 3,
  backgroundColor,
  dark = true,
  xUnit = "$",
  width = "100%",
  height = 500,
  reverse,
  xLabelFormatter = defaultFormatter,
}) => {
  const bgColor = backgroundColor
    ? backgroundColor
    : dark
    ? "bg-gray-900"
    : "bg-gray-50";

  const keys = Object.keys(data[0]);
  if (reverse) keys.reverse();
  const xLabel = keys[0];
  const yLabel = keys[keys.length - 1];

  console.log(xLabel, yLabel);
  if (keys.length > 2) {
    keys.pop();
    keys.shift();
  } else {
    keys.shift();
  }

  return (
    <div className={`box-shadow-01 p-8 ${bgColor} rounded-xl`}>
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={data} className="bg-[#B4764]">
          {keys.map((item, i) => (
            <Bar key={item} name={item} dataKey={item} fill={LineColor[i]} />
          ))}

          <XAxis
            type="category"
            dataKey={xLabel}
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            tickCount={5}
            allowDataOverflow
            padding={{ left: 30, right: 30 }}
            tickFormatter={(str) => xLabelFormatter(str)}
          />

          <YAxis
            dataKey={yLabel}
            axisLine={false}
            tickMargin={10}
            tickLine={false}
            allowDataOverflow
            tickCount={5}
            tickFormatter={(number) => `${number.toFixed(2)}`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ opacity: "0.1" }} />

          <Legend verticalAlign="top" height={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;

const CustomTooltip = ({ active, payload, label, xUnit }: any) => {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyy")}</h4>
        <p>
          {payload[0].value}
          {payload[1].value}
          {xUnit}
        </p>
      </div>
    );
  }
  return null;
};
