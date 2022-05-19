import { useMutation } from "react-query"
import { SignUpDto } from "../dto/sign-up.dto"
import { signUp } from "../services/signUp"

export function useSignUp() {
  return useMutation("signUp", (data: SignUpDto) => signUp(data))
}
