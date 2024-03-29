import { PaginationDto } from "dto/pagination.dto"
import { ProductClassify, ProductSize } from "interfaces/entities"

export enum ProductSort {
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
  PERCENT = "PERCENT",
}

export interface GetProductsDto extends PaginationDto {
  name?: string
  classify?: ProductClassify
  size?: ProductSize
  min_price?: number
  max_price?: number
  in_stock?: string
  in_sale?: boolean
  is_featured?: boolean
  sort?: ProductSort
}
