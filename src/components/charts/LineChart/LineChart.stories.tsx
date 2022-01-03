/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { dat3, data4 } from "components/data";
import React from "react";
import { LineChart } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/LineChart",
  component: LineChart,
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
} as ComponentMeta<typeof LineChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LineChart> = (args) => <LineChart {...args} />;

export const categoryLineChart = Template.bind({});
categoryLineChart.args = {
  datas: dat3,
  xAxisType: "category",
};

export const DateLineChart = Template.bind({});
DateLineChart.args = {
  datas: data4,
  xAxisType: "datetime",
};
