import { ISelectOption, ProductClassify, ProductSize } from "interfaces"
import { ProductSort } from "./dto/get-products-dto"

export const productSizeOptions: ISelectOption[] = Object.keys(ProductSize).map(
  (key) => ({
    label: key,
    value: key,
  })
)

export const productClassifyOptions: ISelectOption[] = Object.keys(
  ProductClassify
).map((key) => ({
  label: key,
  value: key,
}))

export const sortOptions: ISelectOption[] = Object.keys(ProductSort).map(
  (key) => ({
    label: key,
    value: key,
  })
)
