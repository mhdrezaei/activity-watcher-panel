// src/features/compare/components/SummaryCards.tsx
import { ArrowUpRight, ArrowDownRight, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { CompareResponse } from "../types";

export default function SummaryCards({ data }: { data: CompareResponse }) {
  const { a, b } = data.devices;
  const { comparison } = data;

  const cards = [
    {
      title: "مجموع زمان فعالیت",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      valA: a.totals.active_min,
      valB: b.totals.active_min,
      diff: comparison.active_diff_min,
      unit: "دقیقه",
    },
    {
      title: "درصد فعالیت",
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      valA: a.totals.active_pct,
      valB: b.totals.active_pct,
      diff: comparison.active_pct_diff,
      unit: "%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-6 text-slate-700 dark:text-slate-300">
            {card.icon}
            <h4 className="font-medium text-lg">{card.title}</h4>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 block"></span>
                <span className="text-sm text-slate-500 w-24 truncate">
                  {a.name}
                </span>
                <span className="text-xl font-bold">
                  {card.valA}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    {card.unit}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-500 block"></span>
                <span className="text-sm text-slate-500 w-24 truncate">
                  {b.name}
                </span>
                <span className="text-xl font-bold">
                  {card.valB}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    {card.unit}
                  </span>
                </span>
              </div>
            </div>

            <div
              className={`flex flex-col items-end ${card.diff > 0 ? "text-blue-500" : card.diff < 0 ? "text-orange-500" : "text-slate-400"}`}
            >
              <span className="text-xs mb-1 text-slate-400">اختلاف</span>
              <div
                className="flex items-center gap-1 font-semibold text-lg"
                dir="ltr"
              >
                {Math.abs(card.diff)} {card.unit}
                {card.diff > 0 ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : card.diff < 0 ? (
                  <ArrowDownRight className="w-5 h-5" />
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
