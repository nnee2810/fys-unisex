type TypeError = "required"

export function generateValidateError(name: string, type: TypeError) {
  switch (type) {
    case "required":
      return `${name} là bắt buộc`
  }
}
