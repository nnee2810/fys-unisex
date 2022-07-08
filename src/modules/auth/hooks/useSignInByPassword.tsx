import { useMutation } from "react-query"
import { signInByPassword } from "../services"

export function useSignInByPassword() {
  return useMutation("sign-in", signInByPassword)
}
