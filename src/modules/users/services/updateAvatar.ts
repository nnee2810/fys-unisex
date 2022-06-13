import { API } from "configs/service"
import { IResponse } from "interfaces"

export async function updateAvatar(data: FormData) {
  return (await API.patch<IResponse<string>>("/users/avatar", data)).data.data
}
