import { CurrentStatusCard } from "./UserDetailsPanel/CurrentUserStatus/CurrentStatusCard";
import { TopAppsCard } from "./UserDetailsPanel/UserAppUsage/TopAppCard";
import { UserWorkChart } from "./UserDetailsPanel/UserWorkChart";

export function UserDetailsPanel({ userId }: { userId: string }) {
  if (!userId) {
    return (
      <div className="flex-1 text-gray-400 p-4 text-center">
        کاربری انتخاب نشده
      </div>
    );
  }

  return (
    // 👇 تغییر: اضافه شدن flex-1 برای پر کردن فضای باقیمانده و تنظیم پدینگ موبایل/دسکتاپ
    <div className="w-full flex-1 bg-card text-card-foreground rounded-2xl border px-4 pb-4 lg:px-6 lg:pb-6">
      <h2 className="font-semibold border-b border-border py-4 mb-4">
        جزئیات فعالیت
      </h2>

      {/* 👇 تغییر: در موبایل ۱ ستونه (زیر هم) و در دسکتاپ ۲ ستونه (کنار هم) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <CurrentStatusCard userId={userId} />
        <TopAppsCard userId={userId} />

        {/* 👇 تغییر: مدیریت فضای اشغال شده نمودار در موبایل و دسکتاپ */}
        <div className="col-span-1 xl:col-span-2">
          <UserWorkChart userId={userId} />
        </div>
      </div>
    </div>
  );
}
