export interface GetProductsDto {
  name?: string
  type?: string
  gender?: string
  inStock?: string
  size?: string
  minPrice?: number
  maxPrice?: number
  isFeatured?: boolean
  isSale?: boolean
  sort?: string
  page?: number
  limit?: number
}
