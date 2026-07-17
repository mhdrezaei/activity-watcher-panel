import { AnimatedStatValue } from "@/shared/components/ui/animated-number/AnimatedStatValue";
import { DateTimeBox } from "@/shared/components/widgets/DateTimeBox";

interface StatItem {
  label: string;
  value?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

interface OverviewCardsProps {
  stats?: StatItem[];
  isLoading?: boolean;
}

export function OverviewCards({ stats, isLoading }: OverviewCardsProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between bg-accent border border-border rounded-2xl p-4 lg:p-5 gap-4">
      <div className="w-full flex items-center justify-center lg:justify-start flex-wrap lg:flex-nowrap gap-4 md:gap-6">
        {stats?.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 lg:gap-3 pr-0 lg:pr-4 border-none lg:border-solid lg:border-r border-border first:border-none"
          >
            <div
              title={item.label}
              className="flex shrink-0 items-center justify-center bg-card p-2 rounded-md"
            >
              {item.icon}
            </div>

            <span className="hidden md:block text-gray-500 text-sm whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-primary text-sm font-bold whitespace-nowrap">
              <AnimatedStatValue
                value={item.value}
                suffix=" نفر"
                isLoading={isLoading}
              />
            </span>
          </div>
        ))}
      </div>

      {/* جلوگیری از فشرده شدن کامپوننت تاریخ در دسکتاپ */}
      <div className="shrink-0 w-full lg:w-auto flex justify-center">
        <DateTimeBox />
      </div>
    </div>
  );
}
