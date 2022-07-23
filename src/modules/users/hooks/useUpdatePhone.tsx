import { API } from "configs/services"
import { useMutation } from "react-query"
import { UpdatePhoneDto } from "../dto"

export function useUpdatePhone() {
  return useMutation("update-phone", (data: UpdatePhoneDto) =>
    API.patch("/user/update-phone", {
      ...data,
      //@ts-ignore
      session_info: window.session_info,
    })
  )
}
