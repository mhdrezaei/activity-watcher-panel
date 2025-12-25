import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { User, Settings } from "lucide-react";

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------
   Hook-safe Story Components
--------------------------------- */

function ControlledTabs() {
  const [value, setValue] = useState("general");

  return (
    <Tabs value={value} onValueChange={setValue} className="w-96">
      <TabsList>
        <TabsTrigger value="general">عمومی</TabsTrigger>
        <TabsTrigger value="users">کاربران</TabsTrigger>
        <TabsTrigger value="settings">تنظیمات</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="p-4 text-sm">
        محتوای تب عمومی
      </TabsContent>

      <TabsContent value="users" className="p-4 text-sm">
        محتوای تب کاربران
      </TabsContent>

      <TabsContent value="settings" className="p-4 text-sm">
        محتوای تب تنظیمات
      </TabsContent>
    </Tabs>
  );
}

function TabsWithIcons() {
  return (
    <Tabs defaultValue="profile" className="w-96">
      <TabsList>
        <TabsTrigger value="profile">
          <User size={16} />
          پروفایل
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings size={16} />
          تنظیمات
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="p-4 text-sm">
        اطلاعات پروفایل کاربر
      </TabsContent>

      <TabsContent value="settings" className="p-4 text-sm">
        تنظیمات حساب کاربری
      </TabsContent>
    </Tabs>
  );
}

function DisabledTabs() {
  return (
    <Tabs defaultValue="one" className="w-96">
      <TabsList>
        <TabsTrigger value="one">تب اول</TabsTrigger>
        <TabsTrigger value="two" disabled>
          تب غیرفعال
        </TabsTrigger>
      </TabsList>

      <TabsContent value="one" className="p-4 text-sm">
        فقط تب اول فعال است
      </TabsContent>
    </Tabs>
  );
}

/* --------------------------------
   Stories + Docs Code
--------------------------------- */

export const Default: Story = {
  render: () => <ControlledTabs />,
  parameters: {
    docs: {
      source: {
        code: `
const [value, setValue] = useState("general");

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="general">عمومی</TabsTrigger>
    <TabsTrigger value="users">کاربران</TabsTrigger>
    <TabsTrigger value="settings">تنظیمات</TabsTrigger>
  </TabsList>

  <TabsContent value="general">
    محتوای تب عمومی
  </TabsContent>

  <TabsContent value="users">
    محتوای تب کاربران
  </TabsContent>

  <TabsContent value="settings">
    محتوای تب تنظیمات
  </TabsContent>
</Tabs>
        `,
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => <TabsWithIcons />,
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">
      <User size={16} />
      پروفایل
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Settings size={16} />
      تنظیمات
    </TabsTrigger>
  </TabsList>

  <TabsContent value="profile">
    اطلاعات پروفایل کاربر
  </TabsContent>

  <TabsContent value="settings">
    تنظیمات حساب کاربری
  </TabsContent>
</Tabs>
        `,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => <DisabledTabs />,
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">تب اول</TabsTrigger>
    <TabsTrigger value="two" disabled>
      تب غیرفعال
    </TabsTrigger>
  </TabsList>

  <TabsContent value="one">
    فقط تب اول فعال است
  </TabsContent>
</Tabs>
        `,
      },
    },
  },
};
