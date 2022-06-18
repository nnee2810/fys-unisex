import { API } from "configs/services"
import { CreateAddressDto } from "../dto"

export function createAddress(data: CreateAddressDto) {
  return API.post("user/create-address", data)
}
