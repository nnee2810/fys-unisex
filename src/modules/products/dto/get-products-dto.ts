import { PaginationDto } from "dto/pagination-dto"
import { ProductClassify, ProductSize } from "interfaces/IProduct"

export enum ProductSort {
  TIME = "TIME",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
  PERCENT = "PERCENT",
}

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
  sort?: ProductSort
}
