/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/18/22, 9:05 PM
 *
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { BarChart } from "./index";
import { dat3 } from "../../data";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/BarChart",
  component: BarChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    datas: Object,
    curveType: {
      defaultValue: "straight",
      control: {
        type: "radio",
      },
    },
  },
} as ComponentMeta<typeof BarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BarChart> = (args) => (
  <BarChart {...args} />
);

export const barChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

barChart.args = {
  datas: dat3,
};
