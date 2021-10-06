import { useState } from "react";
import { ChartData } from "types";

type dataType = {
  data: ChartData;
  left: "dataMin" | string;
  right: "dataMax" | string;
  refAreaLeft: "";
  refAreaRight: "";
  top: "dataMax + 1" | string;
  bottom: "dataMax + 20" | string;
  top2: "dataMax+20" | string;
  bottom2: "dataMin-20" | string;
  animation: true;
};

export const useZoom = ({
  data,
  left,
  right,
  refAreaLeft,
  refAreaRight,
  top,
  bottom,
  top2,
  bottom2,
  animation,
}: dataType) => {
  const getAxisYDomain = (from: any, to: any, ref: any, offset: any) => {
    const refData = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d: any) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const [zoomState, setZoomState] = useState({
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
    top2,
    bottom2,
    animation,
  });

  const keys = Object.keys(data[0]);
  const ylabel = keys[3];

  const zoomIn = () => {
    let { refAreaLeft, refAreaRight, data } = zoomState;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setZoomState({
        ...zoomState,
        refAreaLeft: "",
        refAreaRight: "",
      });
      return;
    }
    // xAxis Domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, ylabel, 0);

    setZoomState({
      ...zoomState,
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    });
  };

  const zoomOut = () => {
    setZoomState({
      ...zoomState,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      top2: "dataMax+50",
      bottom: "dataMin",
    });
  };

  return {
    zoomIn,
    zoomOut,
    zoomState,
    setZoomState,
  };
};
