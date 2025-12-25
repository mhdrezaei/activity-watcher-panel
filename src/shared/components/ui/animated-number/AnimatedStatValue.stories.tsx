import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedStatValue } from "./AnimatedStatValue";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof AnimatedStatValue> = {
  title: "UI/AnimatedStatValue",
  component: AnimatedStatValue,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------
   Stories
--------------------------------- */

export const Default: Story = {
  args: {
    value: 128,
  },
  parameters: {
    docs: {
      source: {
        code: `
<AnimatedStatValue value={128} />
        `,
      },
    },
  },
};

export const WithSuffix: Story = {
  args: {
    value: 45,
    suffix: " دقیقه",
  },
  parameters: {
    docs: {
      source: {
        code: `
<AnimatedStatValue value={45} suffix=" دقیقه" />
        `,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<AnimatedStatValue isLoading />
        `,
      },
    },
  },
};

export const LoadingThenValue: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ updateArgs }) => {
    // شبیه‌سازی لود شدن دیتا
    await new Promise((r) => setTimeout(r, 1500));
    updateArgs({
      isLoading: false,
      value: 72,
      suffix: " ساعت",
    });
  },
  parameters: {
    docs: {
      source: {
        code: `
<AnimatedStatValue
  isLoading={isLoading}
  value={72}
  suffix=" ساعت"
/>
        `,
      },
    },
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
    suffix: " دقیقه",
  },
  parameters: {
    docs: {
      source: {
        code: `
<AnimatedStatValue value={0} suffix=" دقیقه" />
        `,
      },
    },
  },
};
