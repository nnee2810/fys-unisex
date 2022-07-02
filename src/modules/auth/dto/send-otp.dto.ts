export enum ActionOTP {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
}

export interface SendOTPDto {
  phone: string
  action: number
}
