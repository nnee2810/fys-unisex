export function convertProductName(value: string): string {
  return value.toLowerCase().replaceAll(" ", "-")
}
