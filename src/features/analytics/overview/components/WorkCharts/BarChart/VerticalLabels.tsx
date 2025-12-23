import type { BarCustomLayer } from "@nivo/bar";

function splitMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return {
    hoursText: hours > 0 ? `${hours} ساعت` : null,
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
        if (bar.height < 40) return null;

        const { hoursText, minutesText } = splitMinutes(bar.data.value ?? 0);

        const centerX = bar.x + bar.width / 2;
        const centerY = bar.y + bar.height / 2;

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
                userSelect: "none",
              }}
            >
              {hoursText && (
                <tspan x={0} dy={minutesText ? "-0.6em" : "0"}>
                  {hoursText}
                </tspan>
              )}

              {minutesText && (
                <tspan x={0} dy={hoursText ? "1.2em" : "0"}>
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
