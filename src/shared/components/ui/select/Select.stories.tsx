import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "./select";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------
   Hook-safe story components
--------------------------------- */

function ControlledSelect({ size }: { size?: "sm" | "default" }) {
  const [value, setValue] = useState("apple");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger size={size} className="w-56">
        <SelectValue placeholder="انتخاب کنید" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">🍎 سیب</SelectItem>
        <SelectItem value="banana">🍌 موز</SelectItem>
        <SelectItem value="orange">🍊 پرتقال</SelectItem>
      </SelectContent>
    </Select>
  );
}

function WithGroupStory() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="انتخاب کشور" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>خاورمیانه</SelectLabel>
          <SelectItem value="ir">🇮🇷 ایران</SelectItem>
          <SelectItem value="tr">🇹🇷 ترکیه</SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>اروپا</SelectLabel>
          <SelectItem value="de">🇩🇪 آلمان</SelectItem>
          <SelectItem value="fr">🇫🇷 فرانسه</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function DisabledItemStory() {
  const [value, setValue] = useState("apple");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="apple">سیب</SelectItem>
        <SelectItem value="banana" disabled>
          موز (غیرفعال)
        </SelectItem>
        <SelectItem value="orange">پرتقال</SelectItem>
      </SelectContent>
    </Select>
  );
}

function ScrollableStory() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="انتخاب آیتم" />
      </SelectTrigger>

      <SelectContent>
        {Array.from({ length: 20 }).map((_, i) => (
          <SelectItem key={i} value={`item-${i}`}>
            آیتم {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* --------------------------------
   Stories + REAL JSX for Docs
--------------------------------- */

export const Default: Story = {
  render: () => <ControlledSelect />,
  parameters: {
    docs: {
      source: {
        code: `
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="انتخاب کنید" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">🍎 سیب</SelectItem>
    <SelectItem value="banana">🍌 موز</SelectItem>
    <SelectItem value="orange">🍊 پرتقال</SelectItem>
  </SelectContent>
</Select>
        `,
      },
    },
  },
};

export const Small: Story = {
  render: () => <ControlledSelect size="sm" />,
  parameters: {
    docs: {
      source: {
        code: `
<Select value={value} onValueChange={setValue}>
  <SelectTrigger size="sm" className="w-56">
    <SelectValue placeholder="انتخاب کنید" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">🍎 سیب</SelectItem>
    <SelectItem value="banana">🍌 موز</SelectItem>
    <SelectItem value="orange">🍊 پرتقال</SelectItem>
  </SelectContent>
</Select>
        `,
      },
    },
  },
};

export const WithGroup: Story = {
  render: () => <WithGroupStory />,
  parameters: {
    docs: {
      source: {
        code: `
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="انتخاب کشور" />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup>
      <SelectLabel>خاورمیانه</SelectLabel>
      <SelectItem value="ir">🇮🇷 ایران</SelectItem>
      <SelectItem value="tr">🇹🇷 ترکیه</SelectItem>
    </SelectGroup>

    <SelectGroup>
      <SelectLabel>اروپا</SelectLabel>
      <SelectItem value="de">🇩🇪 آلمان</SelectItem>
      <SelectItem value="fr">🇫🇷 فرانسه</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
        `,
      },
    },
  },
};

export const DisabledItem: Story = {
  render: () => <DisabledItemStory />,
  parameters: {
    docs: {
      source: {
        code: `
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-56">
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="apple">سیب</SelectItem>
    <SelectItem value="banana" disabled>
      موز (غیرفعال)
    </SelectItem>
    <SelectItem value="orange">پرتقال</SelectItem>
  </SelectContent>
</Select>
        `,
      },
    },
  },
};

export const Scrollable: Story = {
  render: () => <ScrollableStory />,
  parameters: {
    docs: {
      source: {
        code: `
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="انتخاب آیتم" />
  </SelectTrigger>

  <SelectContent>
    {Array.from({ length: 20 }).map((_, i) => (
      <SelectItem key={i} value={\`item-\${i}\`}>
        آیتم {i + 1}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
        `,
      },
    },
  },
};
