import { API } from "configs/services"

export function deleteAddress(id: string) {
  return API.delete(`/user/delete-address/${id}`)
}
