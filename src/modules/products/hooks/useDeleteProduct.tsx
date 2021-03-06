import { API } from "configs/services"
import { useMutation } from "react-query"

export function useDeleteProduct() {
  return useMutation((id: string) =>
    API.delete(`/product/delete-product/${id}`)
  )
}
