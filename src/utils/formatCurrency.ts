export function formatCurrency(value: number) {
  return value.toLocaleString("de-DE", { style: "currency", currency: "VND" })
}
