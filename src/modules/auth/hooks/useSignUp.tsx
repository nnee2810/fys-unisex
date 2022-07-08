import { useMutation } from "react-query"
import { signUp } from "../services"

export function useSignUp() {
  return useMutation("sign-up", signUp)
}
