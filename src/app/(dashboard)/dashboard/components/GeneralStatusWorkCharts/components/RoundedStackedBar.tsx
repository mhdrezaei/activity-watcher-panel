"use client";

import type { BarItemProps, BarDatum } from "@nivo/bar";

const RoundedStackedBar = (props: BarItemProps<BarDatum>) => {
  const { bar } = props;

  const { x, y, width, height, color, data } = bar;

  const radius = 10;
  const id = String(data.id);
  const isBottom = id === "فعال";
  const isTop = id === "عدم_فعالیت";

  const r = Math.min(radius, Math.floor(height / 2));

  const path = isTop
    ? `M${x} ${y + r}
       Q${x} ${y} ${x + r} ${y}
       H${x + width - r}
       Q${x + width} ${y} ${x + width} ${y + r}
       V${y + height}
       H${x}
       Z`
    : isBottom
      ? `M${x} ${y}
       H${x + width}
       V${y + height - r}
       Q${x + width} ${y + height} ${x + width - r} ${y + height}
       H${x + r}
       Q${x} ${y + height} ${x} ${y + height - r}
       V${y}
       Z`
      : `M${x} ${y} H${x + width} V${y + height} H${x} Z`;

  return <path d={path} fill={color} style={{ cursor: "pointer" }} />;
};

export default RoundedStackedBar;
