import { API } from "configs/services"
import { useMutation } from "react-query"
import { UpdateAddressDto } from "../dto"

export function useUpdateAddress() {
  return useMutation("update-address", ({ id, ...data }: UpdateAddressDto) =>
    API.patch(`/user/update-address/${id}`, data)
  )
}
