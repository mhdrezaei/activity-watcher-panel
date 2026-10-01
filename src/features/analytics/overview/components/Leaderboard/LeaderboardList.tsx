import { LeaderboardResponse, LeaderboardUser } from "../../types";
import { cn } from "@/lib/utils/shadcn";
import { Trophy, TrendingDown, Clock, Activity } from "lucide-react";

interface Props {
  data: LeaderboardResponse;
  rankBy: string;
}

const formatMinutes = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = Math.floor(mins % 60);
  if (h > 0) return `${h} ساعت و ${m} دقیقه`;
  return `${m} دقیقه`;
};

export function LeaderboardList({ data, rankBy }: Props) {
  const renderList = (users: LeaderboardUser[], isTop: boolean) => {
    return (
      <div className="flex flex-col gap-3">
        {users.map((user, idx) => (
          <div
            key={idx}
            className={cn(
              "flex flex-wrap sm:flex-nowrap items-center justify-between p-3 rounded-lg border bg-card transition-all hover:scale-[1.01] hover:shadow-md gap-2",
              isTop ? "border-emerald-500/20" : "border-rose-500/20"
            )}
          >
            <div className="flex items-center gap-4 text-right">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0",
                  isTop
                    ? idx === 0
                      ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                      : idx === 1
                        ? "bg-slate-200 text-slate-600 dark:bg-slate-700/50"
                        : idx === 2
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30"
                          : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                    : "bg-rose-100 text-rose-600 dark:bg-rose-900/30"
                )}
              >
                {idx + 1}
              </div>
              <div className="flex flex-col items-start text-right">
                <span className="font-semibold text-sm">{user.device_name}</span>
                <span className="text-xs text-muted-foreground">{user.role || "بدون نقش"}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1.5 text-sm font-medium" dir="rtl">
                {rankBy === "active_pct" ? (
                  <>
                    <Activity size={14} className={isTop ? "text-emerald-500" : "text-rose-500"} />
                    <span className={isTop ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                      {user.active_pct}%
                    </span>
                  </>
                ) : (
                  <>
                    <Clock size={14} className={isTop ? "text-emerald-500" : "text-rose-500"} />
                    <span className={isTop ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                      {formatMinutes(user.working_min)}
                    </span>
                  </>
                )}
              </div>
              <div className="text-[10px] text-muted-foreground flex gap-2" dir="rtl">
                <span>کار: {formatMinutes(user.working_min)}</span>
                <span>استراحت: {formatMinutes(user.inactive_min)}</span>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-sm text-center text-muted-foreground py-8">
            داده‌ای برای نمایش وجود ندارد
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex flex-col gap-4 bg-card dark:bg-card/60 p-4 rounded-xl border border-emerald-500/20 dark:border-emerald-500/20">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg shrink-0">
            <Trophy className="text-emerald-600 dark:text-emerald-500" size={20} />
          </div>
          <h4 className="font-bold text-foreground">برترین‌ها</h4>
        </div>
        {renderList(data.top, true)}
      </div>

      <div className="flex flex-col gap-4 bg-card dark:bg-card/60 p-4 rounded-xl border border-rose-500/20 dark:border-rose-500/20">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="bg-rose-100 dark:bg-rose-500/10 p-2 rounded-lg shrink-0">
            <TrendingDown className="text-rose-600 dark:text-rose-500" size={20} />
          </div>
          <h4 className="font-bold text-foreground">ضعیف‌ترین‌ها</h4>
        </div>
        {renderList(data.bottom, false)}
      </div>
    </div>
  );
}
