import { API } from "configs/services"
import { IResponse } from "interfaces"
import { useMutation } from "react-query"
import { SignInByPasswordDto } from "../dto"

export function useSignIn() {
  return useMutation(
    "sign-in",
    async (data: SignInByPasswordDto) =>
      (await API.post<IResponse<string>>("/auth/sign-in", data)).data.data
  )
}
