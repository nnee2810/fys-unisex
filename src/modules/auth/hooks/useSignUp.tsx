import { API } from "configs/services"
import { useMutation } from "react-query"
import { SignUpDto } from "../dto"

export function useSignUp() {
  return useMutation("sign-up", (data: SignUpDto) =>
    API.post("/auth/sign-up", {
      ...data,
      //@ts-ignore
      session_info: window.session_info,
    })
  )
}
