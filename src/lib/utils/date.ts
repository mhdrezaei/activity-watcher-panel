export function formatToJalali(
  isoDate: string,
  options?: Intl.DateTimeFormatOptions
) {
  if (!isoDate) return "—";

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }).format(date);
}
