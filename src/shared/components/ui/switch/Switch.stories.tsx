import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Switch } from "./Switch";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------
   Hook-safe story components
--------------------------------- */

function ControlledSwitch(props: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} {...props} />
      <span className="text-sm text-muted-foreground">
        {checked ? "فعال" : "غیرفعال"}
      </span>
    </div>
  );
}

/* --------------------------------
   Stories
--------------------------------- */

export const Default: Story = {
  render: () => <ControlledSwitch />,
  parameters: {
    docs: {
      source: {
        code: `
const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
/>
        `,
      },
    },
  },
};

export const Checked: Story = {
  render: () => <ControlledSwitch defaultChecked />,
  parameters: {
    docs: {
      source: {
        code: `
<Switch defaultChecked />
        `,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => <Switch disabled />,
  parameters: {
    docs: {
      source: {
        code: `
<Switch disabled />
        `,
      },
    },
  },
};

export const DisabledChecked: Story = {
  render: () => <Switch disabled defaultChecked />,
  parameters: {
    docs: {
      source: {
        code: `
<Switch disabled defaultChecked />
        `,
      },
    },
  },
};
