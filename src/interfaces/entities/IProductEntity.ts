import { IBaseEntity, IProductImageEntity, IUserEntity } from "."

export enum ProductClassify {
  SHIRT = "SHIRT",
  PANT = "PANT",
  ACCESSORY = "ACCESSORY",
  SET = "SET",
}

export enum ProductSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

export interface IProductEntity extends IBaseEntity {
  name: string
  images: IProductImageEntity[]
  classify: ProductClassify
  price: number
  sale_price: number
  sale_percent: number
  for_sale: boolean
  in_sale: boolean
  in_stock: boolean
  is_featured: boolean
}

export interface IProductReview {
  id: string
  user: IUserEntity
  content: string
  rate: number
  created_at: string
}
