import { ClockCheck } from "lucide-react";

type Props = {
  title: string;
  time: string;
};

export function StatusListFooter({ title, time }: Props) {
  return (
    <div className="mt-3 rounded-lg bg-[#F0F0F0] p-3 flex items-center justify-between">
      <div className="font-medium">{title}</div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ClockCheck className="w-4 h-4" />
        {time}
      </div>
    </div>
  );
}
