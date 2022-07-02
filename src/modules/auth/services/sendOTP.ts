import { API } from "configs/services"
import { RecaptchaVerifier } from "firebase/auth"
import { IResponse } from "interfaces"
import { SendOTPDto } from "../dto"

export async function sendOTP(data: SendOTPDto) {
  const recaptcha_token = //@ts-ignore
    await (window.recaptchaVerifier as RecaptchaVerifier).verify()
  return (
    await API.post<IResponse<string>>("/auth/send-otp", {
      ...data,
      recaptcha_token,
    })
  ).data.data
}
