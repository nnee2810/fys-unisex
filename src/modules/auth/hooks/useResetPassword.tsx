import { useMutation } from "react-query"
import { resetPassword } from "../services"

export function useResetPassword() {
  return useMutation("reset-password", resetPassword)
}
