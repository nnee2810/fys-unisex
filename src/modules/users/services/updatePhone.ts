import { API } from "configs/services"
import { UpdatePhoneDto } from "../dto"

export function updatePhone(data: UpdatePhoneDto) {
  return API.patch("/user/update-phone", {
    ...data,
    //@ts-ignore
    session_info: window.session_info,
  })
}
