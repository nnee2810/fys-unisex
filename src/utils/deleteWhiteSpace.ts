export function deleteWhiteSpace(value: string = "") {
  return value.replace(/ +/g, " ")
}
