import { useMutation } from "react-query"
import { SignInDto } from "../dto/sign-in.dto"
import { signIn } from "../services/signIn"

export function useSignIn() {
  return useMutation("signIn", (data: SignInDto) => signIn(data))
}
