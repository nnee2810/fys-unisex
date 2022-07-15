import { API } from "configs/services"

export function deleteProduct(id: string) {
  return API.delete(`/product/delete-product/${id}`)
}
