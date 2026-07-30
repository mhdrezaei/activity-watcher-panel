// src/features/compare/components/CompareHeader.tsx
"use client";

import { Dispatch, SetStateAction } from "react";
import { ComparePayload } from "../types";
import { useDevices } from "../api/useCompare";
import { Loader2, GitCompare, ChevronDown } from "lucide-react";
import {
  SearchableSelect,
  SelectOption,
} from "@/shared/components/ui/searchable-select/searchable-select";

interface CompareHeaderProps {
  params: ComparePayload;
  setParams: Dispatch<SetStateAction<ComparePayload>>;
  onCompare: () => void;
  isLoading: boolean;
}

export default function CompareHeader({
  params,
  setParams,
  onCompare,
  isLoading,
}: CompareHeaderProps) {
  const { data: devices, isLoading: isDevicesLoading } = useDevices();

  const handleDeviceChange = (key: "device_a" | "device_b", value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const deviceOptions: SelectOption[] = (devices || []).map((dev) => ({
    value: dev.id,
    label: dev.name,
    subLabel: dev.hostname,
  }));

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
      <div className="w-full space-y-2">
        <label className="text-sm font-medium flex items-center gap-2 text-foreground">
          <span className="w-3 h-3 rounded-full bg-blue-500 block"></span>
          کاربر اول
        </label>
        <SearchableSelect
          options={deviceOptions}
          value={params.device_a}
          onChange={(val) => handleDeviceChange("device_a", val)}
          placeholder="انتخاب کاربر..."
          disabled={isDevicesLoading}
          disabledValue={params.device_b}
        />
      </div>

      <div className="w-full space-y-2">
        <label className="text-sm font-medium flex items-center gap-2 text-foreground">
          <span className="w-3 h-3 rounded-full bg-orange-500 block"></span>
          کاربر دوم
        </label>
        <SearchableSelect
          options={deviceOptions}
          value={params.device_b}
          onChange={(val) => handleDeviceChange("device_b", val)}
          placeholder="انتخاب کاربر..."
          disabled={isDevicesLoading}
          disabledValue={params.device_a}
        />
      </div>

      <div className="w-full space-y-2 relative">
        <label className="text-sm font-medium text-foreground block">
          بازه زمانی
        </label>
        <select
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
          value={params.range_key}
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              range_key: e.target.value as ComparePayload["range_key"],
            }))
          }
        >
          <option value="current_day">امروز</option>
          <option value="last_2_days">دو روز گذشته</option>
          <option value="last_3_days">سه روز گذشته</option>
          <option value="last_7_days">هفت روز گذشته</option>
        </select>
        <ChevronDown className="absolute left-3 top-[34px] h-4 w-4 opacity-50 pointer-events-none" />
      </div>

      <button
        onClick={onCompare}
        disabled={!params.device_a || !params.device_b || isLoading}
        className="h-10 w-full rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex justify-center items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>در حال پردازش...</span>
          </>
        ) : (
          <>
            <GitCompare className="w-4 h-4" />
            <span>مقایسه عملکرد</span>
          </>
        )}
      </button>
    </div>
  );
}
