import { API } from "configs/services"
import { UpdateProductDto } from "../dto"

export function updateProduct({ id, ...data }: UpdateProductDto) {
  return API.patch(`/product/update-product/${id}`, data)
}
