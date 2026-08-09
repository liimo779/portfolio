export function formatMonthYear(value) {
  if (!value) return "حتى الآن";
  const date = new Date(`${value}-01`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar", { year: "numeric", month: "long" }).format(date);
}
