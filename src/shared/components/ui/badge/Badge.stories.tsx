import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Check, AlertTriangle } from "lucide-react";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-background text-foreground flex flex-wrap gap-4">
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
    children: "پیش‌فرض",
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge>پیش‌فرض</Badge>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
        `,
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <>
      <Badge>
        <Check />
        فعال
      </Badge>

      <Badge variant="destructive">
        <AlertTriangle />
        خطا
      </Badge>
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Badge>
  <Check />
  فعال
</Badge>

<Badge variant="destructive">
  <AlertTriangle />
  خطا
</Badge>
        `,
      },
    },
  },
};

export const AsLink: Story = {
  render: () => (
    <Badge asChild variant="outline">
      <a href="#">مشاهده جزئیات</a>
    </Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Badge asChild variant="outline">
  <a href="#">مشاهده جزئیات</a>
</Badge>
        `,
      },
    },
  },
};

export const LongText: Story = {
  args: {
    children: "این یک متن طولانی برای نمایش رفتار Badge است",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Badge>
  این یک متن طولانی برای نمایش رفتار Badge است
</Badge>
        `,
      },
    },
  },
};
