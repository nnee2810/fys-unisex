import { API } from "configs/services"
import { useMutation } from "react-query"

export function useDeleteProductImage() {
  return useMutation((id: string) =>
    API.delete(`/product/delete-product-image/${id}`)
  )
}
