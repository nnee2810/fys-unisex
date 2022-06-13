import { API } from "configs/service"
import { IResponse } from "interfaces"
import { SignInByPasswordDto } from "../dto"

export async function signInByPassword(data: SignInByPasswordDto) {
  return (await API.post<IResponse<string>>("/auth/sign-in", data)).data.data
}
