export enum ValidateMessage {
  REQUIRED = "không được bỏ trống",
  INVALID = "không hợp lệ",
  NOT_MATCH = "không khớp",
}

export function getValidateMessage(label: string, error: ValidateMessage) {
  return `${label} ${error}`
}
export function getValidateRequiredMessage(label: string) {
  return label + " " + ValidateMessage.REQUIRED
}

export function getValidateInvalidMessage(label: string) {
  return label + " " + ValidateMessage.INVALID
}

export function getValidateNotMatchMessage(label: string) {
  return label + " " + ValidateMessage.NOT_MATCH
}
