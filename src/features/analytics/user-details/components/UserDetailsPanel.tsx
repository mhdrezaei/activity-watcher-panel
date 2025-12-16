import { User, UserDetails } from "../types";
import CurrentStatus from "./CurrentUserStatus";
import { TopAppsCard } from "./UserAppUsage/TopAppCard";
import { UserWorkChart } from "./UserWorkChart";

export function UserDetailsPanel({
  user,
  details,
}: {
  user: User | null;
  details: UserDetails | null;
}) {
  if (!user || !details) {
    return (
      <div className="flex-1 bg-white rounded-2xl border p-6 text-muted-foreground">
        کاربری انتخاب نشده
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border p-6">
      <h2 className=" border-b border-gray-100 p-4 mb-4">جزئیات فعالیت</h2>
      <div className="grid grid-cols-2  gap-4">
        <CurrentStatus details={details} />
        <TopAppsCard details={details} />
        <div className="col-span-2">
          <UserWorkChart details={details} />
        </div>
      </div>
    </div>
  );
}
