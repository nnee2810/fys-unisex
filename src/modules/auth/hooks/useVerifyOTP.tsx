import { AxiosError } from "axios"
import { ErrorMessage } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { verifyOTP } from "../services"

export function useVerifyOTP() {
  return useMutation("verify-otp", verifyOTP, {
    onError(error) {
      if (error instanceof AxiosError) {
        error.response?.data?.message
        toast.error(
          error.response?.data?.message || ErrorMessage.INTERNAL_SERVER_ERROR
        )
      } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
    },
  })
}
