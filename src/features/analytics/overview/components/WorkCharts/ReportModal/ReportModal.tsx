// src/features/analytics/overview/components/WorkCharts/ReportModal/ReportModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip/Tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select/select";
import { Button } from "@/shared/components/ui/button/Button";
import { apiClient } from "@/lib/axiosClient";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [range, setRange] = useState<string>("current_day");
  const [layout, setLayout] = useState<string>("discrete");
  const [status, setStatus] = useState<
    "idle" | "generating" | "downloading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const generateReportMutation = useMutation({
    mutationFn: async () => {
      setStatus("generating");

      const postResponse = await apiClient.post(
        `report/generate/?range=${range}&layout=${layout}`,
      );
      const reportId = postResponse.data?.report_id;

      if (!reportId) throw new Error("آیدی گزارش دریافت نشد");

      let isDone = false;
      for (let i = 0; i < 30; i++) {
        const statusResponse = await apiClient.get(`report/status/${reportId}`);
        const currentStatus = statusResponse.data?.status;

        if (currentStatus === "done") {
          isDone = true;
          break;
        }

        if (currentStatus === "error" || currentStatus === "failed") {
          throw new Error("تولید گزارش در سرور با خطا مواجه شد");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (!isDone) {
        throw new Error("زمان آماده‌سازی گزارش پایان یافت (Timeout)");
      }

      setStatus("downloading");
      const downloadResponse = await apiClient.get(
        `report/download/${reportId}/`,
        {
          responseType: "blob",
        },
      );

      return downloadResponse.data;
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `Report_${range}_${layout}_${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus("success");

      setTimeout(() => {
        resetAndClose();
      }, 2000);
    },
    onError: (error: {
      response: { data: { message: string } };
      message: string;
    }) => {
      console.error(error);
      const errorMsg =
        error?.response?.data?.message || error.message || "خطایی رخ داده است";

      setErrorMessage(errorMsg);
      setStatus("error");
    },
  });

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      generateReportMutation.reset();
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ایجاد گزارش جامع</DialogTitle>
          <DialogDescription>
            بازه زمانی مورد نظر خود را برای دریافت گزارش کامل انتخاب کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="report-range"
              className="text-sm font-medium text-foreground"
            >
              بازه زمانی:
            </label>
            <Select
              value={range}
              onValueChange={setRange}
              disabled={status !== "idle" && status !== "error"}
            >
              <SelectTrigger id="report-range" className="w-full h-10">
                <SelectValue placeholder="انتخاب بازه زمانی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_day">امروز</SelectItem>
                <SelectItem value="last_2_days">۲ روز گذشته</SelectItem>
                <SelectItem value="last_3_days">۳ روز گذشته</SelectItem>
                <SelectItem value="current_month">ماه جاری</SelectItem>
                <SelectItem value="last_7_days">۷ روز گذشته</SelectItem>
                <SelectItem value="last_30_days">۳۰ روز گذشته</SelectItem>
                <SelectItem value="last_3_months">۳ ماه گذشته</SelectItem>
                <SelectItem value="last_6_months">۶ ماه گذشته</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="report-layout"
                className="text-sm font-medium text-foreground"
              >
                مدل گزارش:
              </label>
              <Tooltip>
                <TooltipTrigger type="button" className="text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] text-right font-shabnam">
                  <p className="text-sm"><b>مجزا (Discrete):</b> به ازای هر روز یک شیت (Sheet) مجزا در فایل اکسل ایجاد می‌شود.</p>
                  <p className="mt-2 text-sm"><b>یکپارچه (Merged):</b> کل بازه زمانی در قالب یک شیت پیوسته نمایش داده می‌شود.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={layout}
              onValueChange={setLayout}
              disabled={status !== "idle" && status !== "error"}
            >
              <SelectTrigger id="report-layout" className="w-full h-10">
                <SelectValue placeholder="انتخاب مدل گزارش" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discrete">مجزا (هر روز در یک شیت)</SelectItem>
                <SelectItem value="merged">یکپارچه (کل بازه در یک شیت)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-8 flex items-center justify-center mt-2">
            <AnimatePresence mode="wait">
              {status === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center text-sm text-blue-500"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin ml-2" />
                  در حال آماده‌سازی گزارش...
                </motion.div>
              )}
              {status === "downloading" && (
                <motion.div
                  key="downloading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center text-sm text-amber-500"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin ml-2" />
                  درحال دریافت فایل از سرور...
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center text-sm text-green-500 font-bold"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5 ml-2" />
                  گزارش با موفقیت دانلود شد!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center text-sm text-destructive font-bold"
                >
                  <AlertCircle className="mr-2 h-5 w-5 ml-2" />
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={resetAndClose}
            disabled={status === "generating" || status === "downloading"}
          >
            انصراف
          </Button>
          <Button
            onClick={() => generateReportMutation.mutate()}
            disabled={
              status === "generating" ||
              status === "downloading" ||
              status === "success"
            }
          >
            ایجاد و دانلود گزارش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
