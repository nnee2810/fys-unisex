import { ISelectOption } from "interfaces/ISelectOption"

export const sizeOptions: ISelectOption[] = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
]
export const typeOptions: ISelectOption[] = [
  {
    label: "Áo",
    value: "shirt",
  },
  {
    label: "Quần",
    value: "pant",
  },
  {
    label: "Phụ kiện",
    value: "accessory",
  },
]
export const sortOptions: ISelectOption[] = [
  {
    label: "Mới nhất",
    value: "time",
  },
  {
    label: "Giá thấp đến cao",
    value: "price-asc",
  },
  {
    label: "Giá cao đến thấp",
    value: "price-desc",
  },
  {
    label: "% giảm giá nhiều",
    value: "percent",
  },
]
