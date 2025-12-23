import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IRANSANS_XFANUM_BASE64 } from "@/shared/assets/fonts/IRANSansXFaNum.base64";

/* =========================
   Types
========================= */
export type BarDatum = {
  day: string;
  فعال: number;
  عدم_فعالیت: number;
};

/* =========================
   Font Registration (PDF)
========================= */
function registerPersianFont(pdf: jsPDF) {
  pdf.addFileToVFS("IRANSansXFaNum.ttf", IRANSANS_XFANUM_BASE64);
  pdf.addFont("IRANSansXFaNum.ttf", "IRANSansXFaNum", "normal");
  pdf.setFont("IRANSansXFaNum");
}

/* =========================
   PDF Export
========================= */
export async function exportBarChartToPDF(element: HTMLElement, title: string) {
  if (!element) return;

  const dataUrl = await toPng(element, {
    backgroundColor: "#ffffff",
    pixelRatio: 2,
  });

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  registerPersianFont(pdf);

  const pageWidth = pdf.internal.pageSize.getWidth();

  /* -------- Title -------- */
  pdf.setFontSize(16);
  pdf.text(title, pageWidth / 2, 32, {
    align: "center",
  });

  /* -------- Chart Image -------- */
  pdf.addImage(dataUrl, "PNG", 24, 60, pageWidth - 48, 360, undefined, "FAST");

  pdf.save(`${title}.pdf`);
}

/* =========================
   Excel Export
========================= */
export function exportBarChartToExcel(data: BarDatum[], title: string) {
  const rows = data.map((item) => ({
    بازه: item.day,
    "زمان فعال (دقیقه)": item.فعال,
    "زمان عدم فعالیت (دقیقه)": item.عدم_فعالیت,
    "کل زمان (دقیقه)": item.فعال + item.عدم_فعالیت,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    skipHeader: false,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Work Time");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `${title}.xlsx`
  );
}
