import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ApexLineChart } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Charts/ApexLineChart",
  component: ApexLineChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    strokeColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ApexLineChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ApexLineChart> = (args) => (
  <ApexLineChart {...args} />
);

export const apexLineChart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
