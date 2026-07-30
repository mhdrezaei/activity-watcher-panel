// src/features/compare/components/ReportModal.tsx
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  FileText,
  Check,
  Activity,
  Clock,
  AppWindow,
  GitCompare,
} from "lucide-react";
import { CompareResponse } from "../types";
import { useState } from "react";

export default function ReportModal({ data }: { data: CompareResponse }) {
  const [copied, setCopied] = useState(false);
  const { a, b } = data.devices;
  const { comparison } = data;

  const getRangeText = (key: string) => {
    switch (key) {
      case "current_day":
        return "امروز";
      case "last_2_days":
        return "دو روز گذشته";
      case "last_3_days":
        return "سه روز گذشته";
      case "last_7_days":
        return "هفت روز گذشته";
      default:
        return key;
    }
  };
  const rangeText = getRangeText(data.range_key);

  const reportText = `گزارش مقایسه‌ای عملکرد سیستم
بازه تحلیل: ${rangeText}

وضعیت کلی:
در این بازه، کاربر "${comparison.more_active}" عملکرد بالاتری داشته است.

جزئیات کاربر A (${a.name}):
- مجموع فعالیت مفید: ${a.totals.active_min} دقیقه (${a.totals.active_pct}%)
- بیشترین زمان دوری از سیستم: ${a.longest_afk.duration} (در بازه ${a.longest_afk.period})
- نرم‌افزارهای پرکاربرد: ${a.top_apps}

جزئیات کاربر B (${b.name}):
- مجموع فعالیت مفید: ${b.totals.active_min} دقیقه (${b.totals.active_pct}%)
- بیشترین زمان دوری از سیستم: ${b.longest_afk.duration} (در بازه ${b.longest_afk.period})
- نرم‌افزارهای پرکاربرد: ${b.top_apps}

تحلیل اختلاف:
اختلاف زمان فعالیت مفید بین دو کاربر معادل ${Math.abs(comparison.active_diff_min)} دقیقه می‌باشد.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* دکمه با رنگ‌های معنایی (Semantic) هماهنگ با تم */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-muted transition-colors">
          <FileText className="w-4 h-4" />
          گزارش تحلیلی
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-6 shadow-xl border border-border duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {/* هدر مودال */}
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <Dialog.Title className="text-xl font-bold text-foreground">
              گزارش تحلیلی هوشمند
            </Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground transition-colors bg-muted/50 p-2 rounded-full">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {/* محتوای بصری مودال (رندر شده با UI زیبا به جای متن ساده) */}
          <div className="space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {/* وضعیت کلی */}
            <div className="bg-primary/10 text-primary p-4 rounded-xl flex items-center gap-3 border border-primary/20">
              <Activity className="w-6 h-6 shrink-0" />
              <p className="text-sm font-medium leading-relaxed">
                در بازه زمانی{" "}
                <strong className="font-bold px-1">{rangeText}</strong>، کاربر{" "}
                <span className="font-bold text-base underline underline-offset-4 mx-1">
                  &quot;{comparison.more_active}&quot;
                </span>{" "}
                عملکرد بالاتری ثبت کرده است.
              </p>
            </div>

            {/* جزئیات دو کاربر در حالت گرید */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* کارت کاربر A */}
              <div className="bg-muted/30 p-5 rounded-xl border border-border space-y-4">
                <h4 className="font-bold text-blue-500 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
                  {a.name} (کاربر A)
                </h4>
                <ul className="text-sm space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        فعالیت مفید:
                      </strong>{" "}
                      {a.totals.active_min} دقیقه ({a.totals.active_pct}%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        طولانی‌ترین وقفه:
                      </strong>{" "}
                      {a.longest_afk.duration}{" "}
                      <span className="text-[11px] block mt-1 opacity-75">
                        ({a.longest_afk.period})
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AppWindow className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        نرم‌افزارها:
                      </strong>{" "}
                      <span className="text-[11px] block mt-1 leading-relaxed opacity-80">
                        {a.top_apps}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* کارت کاربر B */}
              <div className="bg-muted/30 p-5 rounded-xl border border-border space-y-4">
                <h4 className="font-bold text-orange-500 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 block"></span>
                  {b.name} (کاربر B)
                </h4>
                <ul className="text-sm space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        فعالیت مفید:
                      </strong>{" "}
                      {b.totals.active_min} دقیقه ({b.totals.active_pct}%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        طولانی‌ترین وقفه:
                      </strong>{" "}
                      {b.longest_afk.duration}{" "}
                      <span className="text-[11px] block mt-1 opacity-75">
                        ({b.longest_afk.period})
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AppWindow className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        نرم‌افزارها:
                      </strong>{" "}
                      <span className="text-[11px] block mt-1 leading-relaxed opacity-80">
                        {b.top_apps}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* تحلیل اختلاف */}
            <div className="bg-muted p-4 rounded-xl border border-border text-sm text-foreground flex items-center gap-3">
              <GitCompare className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="leading-relaxed">
                اختلاف زمان فعالیت مفید بین دو کاربر معادل
                <strong className="text-lg mx-1.5 text-primary">
                  {Math.abs(comparison.active_diff_min)}
                </strong>
                دقیقه می‌باشد.
              </span>
            </div>
          </div>

          {/* فوتر مودال (دکمه‌ها) */}
          <div className="mt-6 pt-4 border-t border-border flex justify-end">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              {copied ? "متن گزارش کپی شد" : "کپی متن گزارش"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
