export enum ActionOTP {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
}

export interface SendOTPDto {
  phone: string
  action: number
}
