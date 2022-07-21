import { IProductEntity } from "interfaces/entities"
import { useMemo } from "react"
import { ColumnWithLooseAccessor, useTable } from "react-table"

export function useTableProduct(data: IProductEntity[]) {
  const columns = useMemo<ColumnWithLooseAccessor<IProductEntity>[]>(
    () => [
      {
        Header: "Sản phẩm",
      },
      {
        Header: "Phân loại",
      },

      {
        Header: "Giá / Giá sale",
      },
      { Header: "Trạng thái" },
      { Header: "Ngày cập nhật cuối" },
      { Header: "Ngày tạo" },
      {
        Header: "Hành động",
      },
    ],
    []
  )
  const tableInstance = useTable({ columns, data })

  return tableInstance
}
