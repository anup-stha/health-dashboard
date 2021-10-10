import { LineChart } from "components/charts/LineChartVictory";
import type { NextPage } from "next";
import * as React from "react";

const Home: NextPage = () => {
  return (
    <div className="w-full flex flex-col space-y-20 p-2">
      <LineChart />
    </div>
  );
};

export default Home;
