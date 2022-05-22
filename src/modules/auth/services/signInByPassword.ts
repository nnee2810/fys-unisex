import API from "configs/service"
import {
  SignInByPasswordDto,
  SignInByPasswordResponseDto,
} from "../dto/sign-in-by-password.dto"

export async function signInByPassword(
  data: SignInByPasswordDto
): Promise<SignInByPasswordResponseDto> {
  return (await API.post("/auth/sign-in", data)).data
}
