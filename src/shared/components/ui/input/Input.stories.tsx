import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "متن ورودی",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;
/* ---------------- Default ---------------- */
export const Default: Story = {};
/* ---------------- With Value ---------------- */
export const WithValue: Story = {
  args: {
    value: "مقدار ورودی",
  },
};
/* ---------------- Disabled ---------------- */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: "ورودی غیرفعال",
  },
};
/* ---------------- With Prefix and Suffix ---------------- */
export const WithPrefixAndSuffix: Story = {
  args: {
    prefix: "پیشوند",
  },
};
/* ---------------- Password Input ---------------- */
export const PasswordInput: Story = {
  args: {
    type: "password",
    placeholder: "رمز عبور خود را وارد کنید",
  },
};
