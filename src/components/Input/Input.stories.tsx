/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Input from "@/components/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["email", "password", "text"],
      },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...args} />;
};

export const BaseInput = Template.bind({});
BaseInput.args = {
  type: "text",
  label: "Enter Anything*",
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  type: "email",
  label: "Email*",
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
  label: "Password*",
};

export const ErrorInput = Template.bind({});
ErrorInput.args = {
  type: "text",
  error: "This is a invalid field. Please type something valid.",
  label: "Password*",
};
