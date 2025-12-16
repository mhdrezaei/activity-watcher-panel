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
    <div className="w-full bg-[#F2F4FC] border border-[#DFE4FF] rounded-2xl p-5 flex items-center justify-between gap-6 overflow-x-auto">
      {stats?.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 pr-3 border-r first:border-none"
        >
          <div className="flex items-center justify-center bg-white p-2 rounded-md">
            {item.icon}
          </div>

          <span className="text-gray-500 text-sm">{item.label}</span>
          <span className=" text-primary-dark text-sm font-bold">
            <AnimatedStatValue
              value={item.value}
              suffix=" نفر"
              isLoading={isLoading}
            />
          </span>
        </div>
      ))}
      <DateTimeBox />
    </div>
  );
}
