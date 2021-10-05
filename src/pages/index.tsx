import { ChartArea } from "components/chartArea";
import type { NextPage } from "next";
import * as React from "react";

const Home: NextPage = () => {
  return (
    <div className="w-full p-20">
      <ChartArea dark={false} />
    </div>
  );
};

export default Home;
