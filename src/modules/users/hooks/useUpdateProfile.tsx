import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IUserEntity } from "interfaces/entities"
import { useMutation } from "react-query"
import { UpdateProfileDto } from "../dto"

export function useUpdateProfile() {
  return useMutation(
    "update-profile",
    async (data: UpdateProfileDto) =>
      (await API.patch<IResponse<IUserEntity>>(`user/update-profile`, data))
        .data.data
  )
}
