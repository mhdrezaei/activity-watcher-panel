import { User, UserDetails } from "../types";

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
    <div className="flex-1 bg-white rounded-2xl border p-6 flex flex-col gap-4">
      <h3 className="font-semibold">وضعیت فعلی</h3>

      <div className="text-sm">
        وضعیت حضور: <strong>{details.presence}</strong>
      </div>

      <div className="text-sm">
        برنامه فعال: <strong>{details.currentApp}</strong>
      </div>

      <div className="text-sm">
        زمان فعالیت:{" "}
        <strong>{Math.floor(details.activeTimeMinutes / 60)} ساعت</strong>
      </div>

      <div className="text-sm">
        زمان AFK: <strong>{details.afkTimeMinutes} دقیقه</strong>
      </div>
    </div>
  );
}
