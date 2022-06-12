import { SelectBoxField } from "components"
import { sortOptions } from "modules/products/constants"
import { GetProductsDto } from "modules/products/dto/get-products-dto"
import { useRouter } from "next/router"
import qs from "query-string"

interface SortProductsProps {
  query: GetProductsDto
}

export function SortProducts({ query }: SortProductsProps) {
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
