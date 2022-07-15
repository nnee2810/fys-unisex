import { Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { NextTable, TableSkeleton } from "components"
import { IProductEntity } from "modules/products/interfaces"
import { ProductRow } from "."
import { useTableProductList } from "../hooks"

interface ProductListProps {
  data: IProductEntity[]
  isLoading?: boolean
}

export function ProductList({ data, isLoading }: ProductListProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableProductList(data)

  return (
    <NextTable {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {isLoading ? (
          <TableSkeleton rows={7} />
        ) : (
          rows.map((row) => {
            prepareRow(row)
            return <ProductRow row={row} />
          })
        )}
      </Tbody>
    </NextTable>
  )
}
