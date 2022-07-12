import { IBaseEntity } from "interfaces"
import { IUserEntity } from "modules/users/interfaces"

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
  slug: string
  images: string[]
  classify: ProductClassify
  sizes: ProductSize[]
  price: number
  sale_price: number
  sale_percent: number
  on_sale: boolean
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
