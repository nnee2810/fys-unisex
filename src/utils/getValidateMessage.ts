import { MessageParams } from "yup/lib/types"

const enum ValidateMessage {
  REQUIRED = "không được để trống",
  INVALID = "không hợp lệ",
  NOT_MATCH = "không khớp",
}

export function getValidateRequiredMessage({ label }: MessageParams) {
  return label + " " + ValidateMessage.REQUIRED
}

export function getValidateInvalidMessage({ label }: MessageParams) {
  return label + " " + ValidateMessage.INVALID
}

export function getValidateNotMatchMessage({ label }: MessageParams) {
  return label + " " + ValidateMessage.NOT_MATCH
}
