import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useThemeStore } from "@/store/theme.store";

/* --------------------------------
   Storybook Store Mock
--------------------------------- */

// 👇 فقط برای Storybook
function ThemeStoreMock({
  initialTheme = "light",
  children,
}: {
  initialTheme?: "light" | "dark";
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    useThemeStore.setState({
      theme: initialTheme,
      toggleTheme: () =>
        useThemeStore.setState((s) => ({
          theme: s.theme === "dark" ? "light" : "dark",
        })),
    });
  }, [initialTheme]);

  return <>{children}</>;
}

/* --------------------------------
   Meta
--------------------------------- */

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
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

export const Light: Story = {
  render: () => (
    <ThemeStoreMock initialTheme="light">
      <ThemeToggle />
    </ThemeStoreMock>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<ThemeToggle />
        `,
      },
    },
  },
};

export const Dark: Story = {
  render: () => (
    <ThemeStoreMock initialTheme="dark">
      <ThemeToggle />
    </ThemeStoreMock>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<ThemeToggle />
        `,
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <ThemeStoreMock initialTheme="light">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="text-sm text-muted-foreground">
          روی سوییچ کلیک کنید
        </span>
      </div>
    </ThemeStoreMock>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex gap-4 items-center">
  <ThemeToggle />
  <span>روی سوییچ کلیک کنید</span>
</div>
        `,
      },
    },
  },
};
