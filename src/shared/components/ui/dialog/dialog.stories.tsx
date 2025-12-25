import { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../button/Button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dialog>;
/* ---------------- Default ---------------- */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
    </Dialog>
  ),
};
/* ---------------- With Content ---------------- */
export const WithContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>عنوان</DialogTitle>
          <DialogDescription>توضیحات دیالوگ</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>محتوای دیالوگ.</p>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* ---------------- With Footer ---------------- */
export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>عنوان</DialogTitle>
          <DialogDescription>توضیحات دیالوگ</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>محتوای دیالوگ.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">لغو</Button>
          <Button>تأیید</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
