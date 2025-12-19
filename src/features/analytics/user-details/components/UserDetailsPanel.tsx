import { CurrentStatusCard } from "./UserDetailsPanel/CurrentUserStatus/CurrentStatusCard";
import { TopAppsCard } from "./UserDetailsPanel/UserAppUsage/TopAppCard";
import { UserWorkChart } from "./UserDetailsPanel/UserWorkChart";

export function UserDetailsPanel({ userId }: { userId: string }) {
  if (!userId) {
    return <div className="flex-1 text-gray-400">کاربری انتخاب نشده</div>;
  }

  return (
    <div className="w-full bg-white rounded-2xl border p-6">
      <h2 className=" border-b border-gray-100 p-4 mb-4">جزئیات فعالیت</h2>
      <div className="grid grid-cols-2  gap-4">
        <CurrentStatusCard userId={userId} />
        <TopAppsCard userId={userId} />
        <div className="col-span-2">
          <UserWorkChart userId={userId} />
        </div>
      </div>
    </div>
  );
}
