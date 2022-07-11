export function getTitle(title: string, isDashboard?: boolean) {
  return `FYS Unisex ${isDashboard ? "Dashboard" : ""} | ${title}`
}
