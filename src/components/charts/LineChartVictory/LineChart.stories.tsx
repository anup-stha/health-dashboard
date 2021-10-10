import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LineChart } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/lineChart",
  component: LineChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    strokeColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LineChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const lineChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
