import { ProductClassify } from "../interfaces"

export interface CreateProductDto {
  name: string
  classify: ProductClassify
  price: number
}
