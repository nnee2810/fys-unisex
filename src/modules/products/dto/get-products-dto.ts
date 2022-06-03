import { PaginationDto } from "dto/pagination-dto"
import { ProductClassify, ProductSize } from "interfaces/IProduct"

export interface GetProductsDto extends PaginationDto {
  name?: string
  classify?: ProductClassify
  gender?: String
  size?: ProductSize
  minPrice?: number
  maxPrice?: number
  inStock?: string
  inSale?: boolean
  isFeatured?: boolean
  sort?: string
}
