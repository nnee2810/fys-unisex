import { AxiosError } from "axios"
import { ErrorMessage } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { resetPassword } from "../services"

export function useResetPassword() {
  return useMutation("reset-password", resetPassword, {
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
