import { AxiosError } from "axios"
import { ErrorMessage } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { signInByPassword } from "../services"

export function useSignInByPassword() {
  return useMutation("sign-in", signInByPassword, {
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || ErrorMessage.INTERNAL_SERVER_ERROR
        )
      } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
    },
  })
}
