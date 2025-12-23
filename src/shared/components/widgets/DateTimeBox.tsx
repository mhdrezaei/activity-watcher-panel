"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export function DateTimeBox() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const time = dayjs(now).format("HH:mm");

  const date = dayjs(now)
    .calendar("jalali")
    .locale("fa")
    .format("DD MMMM YYYY");

  return (
    <div className="flex items-center gap-4 text-primary text-sm">
      {/* Time */}
      <span>{date}</span>

      {/* Divider */}
      <div className="h-4 w-px bg-primary/30" />

      <span>{time}</span>
      {/* Date */}
    </div>
  );
}
