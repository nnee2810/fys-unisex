import { API } from "configs/services"
import { IResponse } from "interfaces"

export async function updateAvatar(data: FormData) {
  return (await API.patch<IResponse<string>>("user/update-avatar", data)).data
    .data
}
