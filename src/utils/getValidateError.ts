type TypeError = "required" | "invalid" | "notMatch"

export function getValidateError(name: string, type: TypeError) {
  switch (type) {
    case "required":
      return `${name} là bắt buộc`
    case "invalid":
      return `${name} không hợp lệ`
    case "notMatch":
      return `${name} không khớp`
  }
}
