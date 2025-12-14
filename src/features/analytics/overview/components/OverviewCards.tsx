import { UsersIcon } from "@/shared/assets/icons";
import { ActiveUsersIcon } from "@/shared/assets/icons/ActiveUsersIcon";
import { AfkUsersIcon } from "@/shared/assets/icons/AfkUsersIcon";
import { OnlineUsersIcon } from "@/shared/assets/icons/OnlineUsersIcon";
import { DateTimeBox } from "@/shared/components/widgets/DateTimeBox";

interface StatItem {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

const stats: StatItem[] = [
  {
    label: "تعداد کل کاربران",
    value: 70,
    icon: <UsersIcon color="#5953F6" active />,
  },
  {
    label: "تعداد کاربران حاضر :",
    value: 30,
    icon: <OnlineUsersIcon color="#5953F6" />,
  },
  {
    label: "تعداد کاربران فعال",
    value: 30,
    icon: <ActiveUsersIcon color="#5953F6" />,
  },
  {
    label: "تعداد کاربران AFK",
    value: 10,
    icon: <AfkUsersIcon color="#5953F6" />,
  },
];

export function OverviewCards() {
  return (
    <div className="w-full bg-[#F2F4FC] border border-[#DFE4FF] rounded-2xl p-5 flex items-center justify-between gap-6 overflow-x-auto">
      {stats.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 pr-3 border-r first:border-none"
        >
          <div className="flex items-center justify-center bg-white p-2 rounded-md">
            {item.icon}
          </div>

          <span className="text-gray-500 text-sm">{item.label}</span>
          <span className=" text-primary-dark text-sm font-bold">
            {item.value} نفر
          </span>
        </div>
      ))}
      <DateTimeBox />
    </div>
  );
}
