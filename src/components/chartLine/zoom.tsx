import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from "types";
import { useZoom } from "utils/useZoom";

const data: ChartData[] = [];
for (let num = 50; num >= 0; num--) {
  data.push({
    price: num + Math.random(),
    date: num,
  });
}

export const ChartLine: React.FC = () => {
  const { zoomIn, zoomState, setZoomState } = useZoom({
    data,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax + 1",
    bottom: "0",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true,
  });

  const keys = Object.keys(data[0]);
  const xLabel = keys[0];
  const yLabel = keys[keys.length - 1];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        onMouseDown={(e: any) =>
          setZoomState({ ...zoomState, refAreaLeft: e.activeLabel })
        }
        onMouseMove={(e: any) =>
          zoomState.refAreaLeft &&
          setZoomState({ ...zoomState, refAreaRight: e.activeLabel })
        }
        onMouseUp={() => zoomIn()}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow={true}
          dataKey={xLabel}
          domain={[zoomState.left, zoomState.right]}
          type="number"
        />
        <YAxis
          allowDataOverflow={true}
          domain={[zoomState.bottom, zoomState.top]}
          type="number"
          yAxisId="1"
          tickFormatter={(number) => `${number.toFixed(2)}`}
        />

        <Tooltip />
        <Line yAxisId="1" type="natural" dataKey={yLabel} stroke="#8884d8" />

        {zoomState.refAreaLeft && zoomState.refAreaRight ? (
          <ReferenceArea
            yAxisId="1"
            x1={zoomState.refAreaLeft}
            x2={zoomState.refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
};
