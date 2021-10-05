import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChartArea } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/AreaChart",
  component: ChartArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    strokeColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ChartArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChartArea> = (args) => (
  <ChartArea {...args} />
);

export const AreaChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
