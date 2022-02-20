/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/18/22, 9:05 PM
 *
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ScatterChart } from "./index";
import { scatterData, scatterDateData } from "../../data";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/ScatterChart",
  component: ScatterChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    datas: Object,

    curveType: {
      defaultValue: "straight",
    },
    backgroundColor: {
      control: "color",
    },
  },
} as ComponentMeta<typeof ScatterChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ScatterChart> = (args) => (
  <ScatterChart {...args} />
);

export const dateScatterChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
dateScatterChart.args = {
  datas: scatterDateData,
};

export const categoryScatterChart = Template.bind({});
categoryScatterChart.args = {
  datas: scatterData,
  xAxisType: "category",
};
