import { API } from "configs/services"
import { useMutation } from "react-query"
import { CreateAddressDto } from "../dto"

export function useCreateAddress() {
  return useMutation("create-address", (data: CreateAddressDto) =>
    API.post("user/create-address", data)
  )
}
