export enum ProductClassify {
  SHIRT = "SHIRT",
  PANT = "PANT",
  ACCESSORY = "ACCESSORY",
  SET = "SET",
}

export enum ProductGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
}

export enum ProductSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

export interface IProduct {
  id: string
  name: string
  slug: string
  images: string[]
  classify: ProductClassify
  gender: ProductGender
  sizes: ProductSize[]
  price: number
  salePrice: number
  onSale: boolean
  inSale: boolean
  inStock: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}
