import { API } from "configs/services"
import { useMutation } from "react-query"
import { CreateProductDto } from "../dto"

export function useCreateProduct() {
  return useMutation("create-product", (data: CreateProductDto) =>
    API.post("/product/create-product", data)
  )
}
