import { API } from "configs/services"
import { useMutation } from "react-query"
import { UpdateProductDto } from "../dto"

export function useUpdateProduct() {
  return useMutation("update-product", ({ id, ...data }: UpdateProductDto) =>
    API.patch(`/product/update-product/${id}`, data)
  )
}
