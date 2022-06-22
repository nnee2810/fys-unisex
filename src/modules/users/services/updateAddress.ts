import { API } from "configs/services"
import { UpdateAddressDto } from "../dto"

export function updateAddress({ id, ...data }: UpdateAddressDto) {
  return API.patch(`/user/update-address/${id}`, data)
}
