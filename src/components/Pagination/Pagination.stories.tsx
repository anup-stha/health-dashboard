import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Pagination",
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const PrimaryPagination = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryPagination.args = {
  totalPageNumber: 10,
};
