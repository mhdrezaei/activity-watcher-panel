import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "دکمه",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* ---------------- Default ---------------- */
export const Default: Story = {};

/* ---------------- Variants ---------------- */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

/* ---------------- Sizes ---------------- */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
};

/* ---------------- Disabled ---------------- */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "غیرفعال",
  },
};

/* ---------------- With Icon ---------------- */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus />
        افزودن
      </>
    ),
  },
};
