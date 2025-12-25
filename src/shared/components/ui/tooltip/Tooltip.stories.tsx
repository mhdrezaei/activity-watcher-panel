import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Button } from "../button/button";
import { Info, HelpCircle } from "lucide-react";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------
   Stories
--------------------------------- */

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>

      <TooltipContent side="top">این یک تولتیپ ساده است</TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">
      Hover me
    </Button>
  </TooltipTrigger>

  <TooltipContent side="top">
    این یک تولتیپ ساده است
  </TooltipContent>
</Tooltip>
        `,
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="inline-flex items-center gap-2 text-sm text-primary">
          <Info size={16} />
          اطلاعات بیشتر
        </button>
      </TooltipTrigger>

      <TooltipContent side="right">جزئیات تکمیلی این بخش</TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <button className="inline-flex items-center gap-2">
      <Info size={16} />
      اطلاعات بیشتر
    </button>
  </TooltipTrigger>

  <TooltipContent side="right">
    جزئیات تکمیلی این بخش
  </TooltipContent>
</Tooltip>
        `,
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-muted">
          <HelpCircle size={16} />
        </button>
      </TooltipTrigger>

      <TooltipContent side="bottom">راهنمای این آیکن</TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip>
  <TooltipTrigger asChild>
    <button className="icon-button">
      <HelpCircle size={16} />
    </button>
  </TooltipTrigger>

  <TooltipContent side="bottom">
    راهنمای این آیکن
  </TooltipContent>
</Tooltip>
        `,
      },
    },
  },
};

export const CustomDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover با تاخیر</Button>
      </TooltipTrigger>

      <TooltipContent>این تولتیپ با تاخیر نمایش داده می‌شود</TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Tooltip delayDuration={500}>
  <TooltipTrigger asChild>
    <Button variant="secondary">
      Hover با تاخیر
    </Button>
  </TooltipTrigger>

  <TooltipContent>
    این تولتیپ با تاخیر نمایش داده می‌شود
  </TooltipContent>
</Tooltip>
        `,
      },
    },
  },
};
