import { useMutation } from "react-query"
import { sendOTP } from "../services"

export function useSendOTP() {
  return useMutation("send-otp", sendOTP)
}
