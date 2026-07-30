// src/features/compare/components/ActionButtons.tsx
"use client";

import { CompareResponse } from "../types";
import { FileSpreadsheet, Download } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import ReportModal from "./ReportModal";

dayjs.extend(jalaliday);

export default function ActionButtons({ data }: { data: CompareResponse }) {
  const handleDownloadPDF = async () => {
    const dashboardElement = document.getElementById(
      "compare-dashboard-content",
    );

    if (!dashboardElement) {
      toast.error("خطا: شناسه compare-dashboard-content در صفحه یافت نشد.");
      return;
    }

    const toastId = toast.loading(
      "در حال تولید فایل PDF، لطفاً منتظر بمانید...",
    );

    try {
      const dataUrl = await toPng(dashboardElement, {
        quality: 0.95,
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#0f172a"
          : "#ffffff",
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (dashboardElement.offsetHeight * pdfWidth) /
        dashboardElement.offsetWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Comparison_${dayjs().format("YYYYMMDD")}.pdf`);

      toast.success("فایل PDF با موفقیت دانلود شد.", { id: toastId });
    } catch (error) {
      toast.error("خطا در تولید فایل PDF", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 mb-6">
      <ReportModal data={data} />

      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-700 bg-rose-500/10 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition-colors dark:text-rose-400"
      >
        <Download className="w-4 h-4" />
        دانلود PDF
      </button>
    </div>
  );
}
