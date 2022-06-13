import { API } from "configs/service"
import { UpdateProfileDto } from "../dto"

export function updateProfile(data: UpdateProfileDto) {
  return API.patch(`/users/profile`, data)
}
