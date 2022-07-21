import { ISelectOption } from "interfaces"
import { ProductClassify, ProductSize } from "interfaces/entities"
import { ProductSort } from "./dto"

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
    value: "for_sale",
  },
  {
    label: "Đang sale",
    value: "in_sale",
  },
  {
    label: "Có sẵn",
    value: "in_stock",
  },
]
