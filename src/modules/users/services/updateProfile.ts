import { API } from "configs/services"
import { IResponse } from "interfaces"
import { UpdateProfileDto } from "../dto"
import { IUserEntity } from "../interfaces"

export async function updateProfile(data: UpdateProfileDto) {
  return (await API.patch<IResponse<IUserEntity>>(`user/update-profile`, data))
    .data.data
}
