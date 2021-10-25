import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableWithPagination } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/TableWithPagination",
  component: TableWithPagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TableWithPagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TableWithPagination> = (args) => (
  <TableWithPagination {...args} />
);

export const tableWithPagination = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
