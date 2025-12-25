import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { Button } from "../button/Button";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-background text-foreground max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/* --------------------------------
   Stories
--------------------------------- */

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          این یک کارت ساده بدون هدر است.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      این یک کارت ساده بدون هدر است.
    </p>
  </CardContent>
</Card>
        `,
      },
    },
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader title="گزارش فعالیت" />
      <CardContent>
        <p className="text-sm text-muted-foreground">
          محتوای کارت در این بخش قرار می‌گیرد.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card>
  <CardHeader title="گزارش فعالیت" />
  <CardContent>
    <p className="text-sm text-muted-foreground">
      محتوای کارت در این بخش قرار می‌گیرد.
    </p>
  </CardContent>
</Card>
        `,
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="لیست کاربران"
        actions={
          <>
            <Button size="sm" variant="outline">
              فیلتر
            </Button>
            <Button size="sm">افزودن</Button>
          </>
        }
      />
      <CardContent>
        <p className="text-sm text-muted-foreground">
          این کارت دارای اکشن در هدر است.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card>
  <CardHeader
    title="لیست کاربران"
    actions={
      <>
        <Button size="sm" variant="outline">
          فیلتر
        </Button>
        <Button size="sm">افزودن</Button>
      </>
    }
  />
  <CardContent>
    <p className="text-sm text-muted-foreground">
      این کارت دارای اکشن در هدر است.
    </p>
  </CardContent>
</Card>
        `,
      },
    },
  },
};

export const DashboardExample: Story = {
  render: () => (
    <Card className="bg-[#f3f6ff]">
      <CardHeader
        title="میزان کارکرد"
        actions={<Button size="sm">جزئیات</Button>}
      />
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">امروز</p>
            <p className="text-lg font-bold text-primary">۴ ساعت</p>
          </div>
          <div className="text-xs text-muted-foreground">
            نسبت به دیروز ↑ ۱۲٪
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card className="bg-[#f3f6ff]">
  <CardHeader
    title="میزان کارکرد"
    actions={<Button size="sm">جزئیات</Button>}
  />
  <CardContent>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">امروز</p>
        <p className="text-lg font-bold text-primary">۴ ساعت</p>
      </div>
      <div className="text-xs text-muted-foreground">
        نسبت به دیروز ↑ ۱۲٪
      </div>
    </div>
  </CardContent>
</Card>
        `,
      },
    },
  },
};
