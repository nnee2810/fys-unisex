import { ProductClassify } from "../interfaces"

export interface UpdateProductDto {
  id: string
  name?: string
  classify?: ProductClassify
  price?: number
  sale_price?: number
  on_sale?: boolean
  in_sale?: boolean
  in_stock?: boolean
  is_featured?: boolean
}
