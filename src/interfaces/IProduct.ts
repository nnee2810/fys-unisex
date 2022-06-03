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
  images: string[]
  classify: ProductClassify
  gender: ProductGender
  size: ProductSize
  price: number
  salePrice: number
  inStock: boolean
  inSale: boolean
  isFeatured: boolean
}
