export enum ActionOTP {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
  UPDATE_PHONE,
}

export interface SendOTPDto {
  phone: string
  action: ActionOTP
}
