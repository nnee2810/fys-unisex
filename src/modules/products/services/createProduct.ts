import { API } from "configs/services"
import { CreateProductDto } from "../dto"

export function createProduct(data: CreateProductDto) {
  return API.post("/product/create-product", data)
}
