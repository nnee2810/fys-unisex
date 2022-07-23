import { ProductClassify } from "interfaces/entities"

export interface CreateProductDto {
  name: string
  classify: ProductClassify
  price: number
}
