import { API } from "configs/services"
import { useMutation } from "react-query"

export function useDeleteAddress() {
  return useMutation("delete-address", (id: string) =>
    API.delete(`/user/delete-address/${id}`)
  )
}
