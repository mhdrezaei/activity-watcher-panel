"use client";

import { useEffect, useState } from "react";
// آدرس نسبی فایل dayjsSetup خود را اینجا قرار دهید
import dayjs from "@/lib/utils/dayjsSetup";

export function DateTimeBox() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  // استفاده از tz برای قفل کردن زمان روی ایران
  const time = dayjs(now).tz("Asia/Tehran").format("HH:mm");

  const date = dayjs(now)
    .tz("Asia/Tehran")
    .calendar("jalali")
    .locale("fa")
    .format("DD MMMM YYYY");

  return (
    <div className="flex items-center justify-center gap-4 text-primary text-sm">
      {/* Time */}
      <span>{date}</span>

      {/* Divider */}
      <div className="h-4 w-px bg-primary/30" />

      <span>{time}</span>
      {/* Date */}
    </div>
  );
}
