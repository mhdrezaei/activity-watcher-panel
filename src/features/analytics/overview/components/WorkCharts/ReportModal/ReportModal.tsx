"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog/dialog";
import { Button } from "@/shared/components/ui/button/Button";
import { apiClient } from "@/lib/axiosClient";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [range, setRange] = useState<string>("current_day");
  const [status, setStatus] = useState<
    "idle" | "generating" | "downloading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const generateReportMutation = useMutation({
    mutationFn: async () => {
      setStatus("generating");

      const postResponse = await apiClient.post(
        `report/generate/?range=${range}`,
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
      a.download = `Report_${range}_${new Date().getTime()}.xlsx`;
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
          <label
            htmlFor="report-range"
            className="text-sm font-medium text-foreground"
          >
            بازه زمانی:
          </label>
          <select
            id="report-range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            disabled={status !== "idle" && status !== "error"}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="current_day">امروز</option>
            <option value="last_2_days">۲ روز گذشته </option>
            <option value="last_3_days">۳ روز گذشته</option>
            <option value="current_month">ماه جاری</option>
            <option value="last_7_days">۷ روز گذشته </option>
            <option value="last_30_days">۳۰ روز گذشته</option>
            <option value="last_3_months">۳ ماه گذشته </option>
            <option value="last_6_months">۶ ماه گذشته </option>
          </select>

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
