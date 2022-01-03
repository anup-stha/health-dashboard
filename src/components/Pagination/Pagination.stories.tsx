/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 10:03 AM
 *
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Pagination",
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const PrimaryPagination = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryPagination.args = {
  totalPageNumber: 10,
};
