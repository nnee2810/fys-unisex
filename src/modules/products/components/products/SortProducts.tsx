import SelectBoxField from "components/Field/SelectBoxField"
import { sortOptions } from "modules/products/constants"
import { GetProductsDto } from "modules/products/dto/get-products-dto"
import { useRouter } from "next/router"
import qs from "query-string"
import React from "react"

interface SortProductsProps {
  query: GetProductsDto
}

export default function SortProducts({ query }: SortProductsProps) {
  const router = useRouter()

  const handleChangeSort = (value: number | string) => {
    const queryString = qs.stringify({
      ...query,
      sort: value,
    })
    router.push(`?${queryString}`)
  }

  return (
    <SelectBoxField
      options={sortOptions}
      onChange={handleChangeSort}
      value={query.sort}
    />
  )
}
