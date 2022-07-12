import { ISelectOption } from "interfaces"
import { ProductSort } from "./dto"
import { ProductClassify, ProductSize } from "./interfaces"

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

export const productSortOptions: ISelectOption[] = Object.keys(ProductSort).map(
  (key) => ({
    label: key,
    value: key,
  })
)

export const productStatusOptions: ISelectOption[] = [
  {
    label: "Đang bán",
    value: "on_sale",
  },
  {
    label: "Giảm giá",
    value: "in_sale",
  },
  {
    label: "Có sẵn",
    value: "in_stock",
  },
]
