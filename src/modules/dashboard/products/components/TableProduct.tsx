import { Box, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { NextAlertModal, NextTable, TableSkeleton } from "components"
import { IProductEntity } from "interfaces/entities"
import { useDeleteProduct } from "modules/products/hooks"
import { useCallback, useState } from "react"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { DrawerUpdateProduct, RowProduct } from "."
import { useTableProduct } from "../hooks"

interface TableProductProps {
  data: IProductEntity[]
  isLoading?: boolean
}

export function TableProduct({ data, isLoading }: TableProductProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableProduct(data)
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
        queryClient.invalidateQueries("get-products")
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
                <Tr {...row.getRowProps()} key={row.original.id}>
                  <RowProduct
                    data={row.original}
                    onSelectUpdate={() => setSelectUpdate(row.original.id)}
                    onSelectDelete={() => setSelectDelete(row.original.id)}
                  />
                </Tr>
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
