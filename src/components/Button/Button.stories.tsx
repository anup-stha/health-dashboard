import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "@/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <div className="flex items-start space-x-4">
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
    </div>
  );
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: "Button",
  variant: "fill",
  color: "primary",
};

export const WarningButton = Template.bind({});
WarningButton.args = {
  children: "Button",
  variant: "fill",
  color: "warning",
};

export const ErrorButton = Template.bind({});
ErrorButton.args = {
  children: "Button",
  variant: "fill",
  color: "error",
};
