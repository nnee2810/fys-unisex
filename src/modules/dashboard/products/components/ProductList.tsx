import { Box, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { NextAlertModal, NextTable, TableSkeleton } from "components"
import { useDeleteProduct } from "modules/products/hooks"
import { IProductEntity } from "modules/products/interfaces"
import { useCallback, useState } from "react"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { DrawerUpdateProduct, ProductRow } from "."
import { useTableProductList } from "../hooks"

interface ProductListProps {
  data: IProductEntity[]
  isLoading?: boolean
}

export function ProductList({ data, isLoading }: ProductListProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableProductList(data)
  const queryClient = useQueryClient()
  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteProduct()
  const [selectUpdate, setSelectUpdate] = useState<string | undefined>()
  const [selectDelete, setSelectDelete] = useState<string | undefined>()

  const resetSelectUpdate = useCallback(() => setSelectUpdate(undefined), [])
  const resetSelectDelete = useCallback(() => setSelectDelete(undefined), [])
  const handleDelete = useCallback(() => {
    if (!selectDelete) return
    mutateDelete(selectDelete, {
      onSuccess() {
        resetSelectDelete()
        toast.success("Xóa sản phẩm thành công")
        queryClient.invalidateQueries("get-product-list")
      },
    })
  }, [selectDelete])

  return (
    <Box>
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
              return (
                <ProductRow
                  row={row}
                  key={row.original.id}
                  onSelectUpdate={() => setSelectUpdate(row.original.id)}
                  onSelectDelete={() => setSelectDelete(row.original.id)}
                />
              )
            })
          )}
        </Tbody>
      </NextTable>
      <DrawerUpdateProduct
        isOpen={!!selectUpdate}
        onClose={resetSelectUpdate}
        data={data.find((product) => product.id === selectUpdate)}
      />
      <NextAlertModal
        isOpen={!!selectDelete}
        title="Xóa sản phẩm"
        confirmText="Xóa"
        onClose={resetSelectDelete}
        onConfirm={handleDelete}
        isLoading={isLoadingDelete}
      >
        <Box>Bạn có chắc muốn xoá sản phẩm này?</Box>
      </NextAlertModal>
    </Box>
  )
}
