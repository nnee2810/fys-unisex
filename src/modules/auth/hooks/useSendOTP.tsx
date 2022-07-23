import { API } from "configs/services"
import { IResponse } from "interfaces"
import { useMutation } from "react-query"
import { SendOTPDto } from "../dto"

export function useSendOTP() {
  return useMutation("send-otp", async (data: SendOTPDto) => {
    const recaptcha_token = //@ts-ignore
      await (window.recaptchaVerifier as RecaptchaVerifier).verify()
    return (
      await API.post<IResponse<string>>("/auth/send-otp", {
        ...data,
        recaptcha_token,
      })
    ).data.data
  })
}
