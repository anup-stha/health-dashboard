import React from "react";

import { ComponentMeta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { Button } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  loading: false,
  children: "Button",
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  loading: true,
  children: "Loader",
  disabled: true,
};
