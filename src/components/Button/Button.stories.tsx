import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "@/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const SuccessButton = Template.bind({});
SuccessButton.args = {
  children: "Button",
  variant: "fill",
};
