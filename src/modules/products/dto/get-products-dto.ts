import { IPagination } from "interfaces/IPagination"

export interface GetProductsDto extends IPagination {
  name?: string
  type?: string
  gender?: string
  inStock?: boolean
  isSale?: boolean
  isFeatured?: boolean
}
