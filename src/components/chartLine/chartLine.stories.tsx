import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChartLine } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/LineChart",
  component: ChartLine,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    strokeColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ChartLine>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChartLine> = (args) => (
  <ChartLine {...args} />
);

export const LineChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
