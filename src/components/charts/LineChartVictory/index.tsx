import { addDays, subDays } from "date-fns";
import * as React from "react";
import {
  createContainer,
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainerProps,
  VictoryZoomContainerProps,
} from "victory";
import { DomainTuple } from "victory-core";
import { defaultData, defaultData2 } from "./data";

type zoomDomainType = { x?: DomainTuple; y?: DomainTuple };
const VictoryZoomVoronoiContainer = createContainer<
  VictoryVoronoiContainerProps,
  VictoryZoomContainerProps
>("zoom", "voronoi");

type LineChartProps = {
  color?: string[];
  data?: [];
  width?: number;
  height?: number;
  xScale?: "linear" | "time" | "log" | "sqrt" | undefined;
  yScale?: "linear" | "time" | "log" | "sqrt" | undefined;
  zoomDimension?: "x" | "y";
};

const colorArray = ["#5B21B6", "#BE185D"];

export const LineChart: React.FC<LineChartProps> = ({
  color = colorArray,
  data = [defaultData, defaultData2],
  width = 800,
  height = 320,
  xScale = "time",
  yScale,
  zoomDimension = "x",
}) => {
  const [state, setState] = React.useState<zoomDomainType>({});

  const handleZoom = (domain: DomainTuple) => {
    setState({ x: domain });
  };

  console.log();

  return (
    <div className="box-shadow-01 rounded-lg">
      <VictoryChart
        width={width}
        height={height}
        scale={{ x: xScale, y: yScale }}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 },
        }}
        containerComponent={
          <VictoryZoomVoronoiContainer
            zoomDimension={zoomDimension}
            zoomDomain={state}
            onZoomDomainChange={() => handleZoom}
            style={{
              touchAction: "auto",
            }}
          />
        }
      >
        <VictoryLegend
          x={0}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{
            labels: {
              fontSize: 16,
            },
          }}
          data={data.map((element, i) => ({
            name: Object.keys(element[0])[1],
            symbol: { fill: colorArray[i], type: "square" },
          }))}
        />
        <VictoryAxis
          style={{
            grid: { stroke: "#E5E7Eb ", strokeWidth: 0.3 },
            axis: { stroke: "" },
            tickLabels: {
              fontSize: 14,
              fill: "#6B7280",
              padding: 25,
            },
          }}
          tickCount={5}
          dependentAxis
          standalone={false}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "#E5E7Eb" },
            tickLabels: {
              fontSize: 14,
              fill: "#6B7280",
              fontFamily: "sans-serif",
              padding: 25,
            },
          }}
        />

        {data.map((element, i) => {
          const y = element[1] && Object.keys(element[1])[1];
          const x = element[0] && Object.keys(element[0])[0];

          const xMinDomain = Math.min.apply(
            null,
            element.map((date) => date[x])
          );

          const xMaxDomain = Math.max.apply(
            null,
            element.map((date) => date[x])
          );

          return (
            <VictoryLine
              style={{
                data: { stroke: color[i] },
              }}
              domain={{
                x: [
                  subDays(new Date(xMinDomain), 2),
                  addDays(new Date(xMaxDomain), 2),
                ],
                y: [
                  -1,
                  Math.max.apply(
                    Math,
                    element.map(function (o) {
                      return o[y];
                    })
                  ) + 4,
                ],
              }}
              data={element}
              x={x}
              y={y}
              key={i}
            />
          );
        })}

        {data.map((element, i) => (
          <VictoryScatter
            size={3}
            key={i}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            labels={({ datum }) =>
              Math.floor(datum[`${Object.keys(element[1])[1]}`])
            }
            labelComponent={
              <VictoryTooltip
                style={{ fill: "white", fontSize: 16, padding: 2 }}
                cornerRadius={2}
                pointerLength={0}
                flyoutStyle={{
                  fill: color[i],
                  stroke: "none",
                }}
              />
            }
            style={{
              data: {
                fill: "#ffffff",
                stroke: color[i],
                strokeWidth: 1.5,
                padding: 1,
              },
            }}
            data={element}
            x={element[0] && Object.keys(element[0])[0]}
            y={element[1] && Object.keys(element[1])[1]}
          />
        ))}
      </VictoryChart>
    </div>
  );
};
