/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 10:03 AM
 *
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TableWithPagination } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modules/TableWithPagination",
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
