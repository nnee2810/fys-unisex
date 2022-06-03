import API from "configs/service"
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto"

export function updateUserProfile(data: UpdateUserProfileDto) {
  return API.patch(`/users/profile`, data)
}
