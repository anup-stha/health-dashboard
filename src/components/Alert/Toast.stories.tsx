import React from "react";
import AlertComponent from "./ToastComponent";
import { ComponentMeta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Alert",
  component: AlertComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AlertComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AlertComponent> = (args) => (
  <AlertComponent {...args} />
);

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  type: "success",
};
export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  type: "error",
};

export const loadingAlert = Template.bind({});
loadingAlert.args = {
  type: "loading",
};

export const PromiseAlert = Template.bind({});
PromiseAlert.args = {
  type: "promise",
};
