import { AxiosError } from "axios"
import { ErrorMessage } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { signUp } from "../services"

export function useSignUp() {
  return useMutation("sign-up", signUp, {
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || ErrorMessage.INTERNAL_SERVER_ERROR
        )
      } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
    },
  })
}
