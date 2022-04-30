export interface IProduct {
  _id: string
  name: string
  images: string[]
  type: string
  gender: string
  price: number
  salePrice: number
  inStock: boolean
  isSale: boolean
  isFeatured: boolean
}
