import type { BarCustomLayer } from "@nivo/bar";

function splitMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return {
    hoursText: `${hours} ساعت`,
    minutesText: minutes > 0 ? `${minutes} دقیقه` : null,
  };
}

const VerticalLabels: BarCustomLayer<{
  day: string;
  فعال: number;
  عدم_فعالیت: number;
}> = ({ bars }) => {
  return (
    <>
      {bars.map((bar) => {
        // اگر bar خیلی کوتاه است، label نشان نده
        if (bar.height < 40) return null;

        const { hoursText, minutesText } = bar.data.value
          ? splitMinutes(bar.data.value)
          : {};

        const centerX = bar.x + bar.width / 2;
        const centerY = bar.y + bar.height / 2;

        const hasTwoLines = Boolean(minutesText);

        return (
          <g
            key={bar.key}
            transform={`translate(${centerX} ${centerY}) rotate(-90)`}
            style={{ pointerEvents: "none" }}
          >
            <text
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fill: "#ffffff",
                fontSize: 10,
                fontWeight: 500,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {/* خط اول: ساعت */}
              <tspan x={0} dy={hasTwoLines ? "-0.6em" : "0"}>
                {hoursText}
              </tspan>

              {/* خط دوم: دقیقه */}
              {hasTwoLines && (
                <tspan x={0} dy="1.2em">
                  {minutesText}
                </tspan>
              )}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default VerticalLabels;
