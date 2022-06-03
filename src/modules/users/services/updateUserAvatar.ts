import API from "configs/service"
import { UpdateUserAvatarDto } from "../dto/update-user-avatar.dto"

export function updateUserAvatar(data: UpdateUserAvatarDto) {
  return API.patch("/users/avatar", data)
}
