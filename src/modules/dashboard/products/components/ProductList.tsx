import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { NextImage, NextTable } from "components"
import { IProductEntity } from "modules/products/interfaces"
import moment from "moment"
import { useRouter } from "next/router"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { formatCurrency } from "utils"
import { useTableProductList } from "../hooks"

interface ProductListProps {
  data: IProductEntity[]
  isLoading?: boolean
}

export function ProductList({ data, isLoading }: ProductListProps) {
  const router = useRouter()
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
        {rows.map((row) => {
          prepareRow(row)
          const rowData = row.original
          return (
            <Tr {...row.getRowProps()}>
              <Td>
                <HStack>
                  <NextImage
                    w="40px"
                    h="40px"
                    borderRadius="6"
                    src={rowData.images?.[0]}
                    alt={rowData.name}
                  />
                  <Text>{rowData.name}</Text>
                </HStack>
              </Td>
              <Td>
                <Tag>{rowData.classify}</Tag>
              </Td>
              <Td>
                <Tag>{rowData.classify}</Tag>
              </Td>
              <Td>
                {formatCurrency(rowData.price)} /{" "}
                {formatCurrency(rowData.sale_price)}
              </Td>
              <Td>
                <HStack justifyContent="center">
                  <Tag colorScheme={rowData.on_sale ? "green" : "gray"}>
                    Đang bán
                  </Tag>
                  <Tag colorScheme={rowData.in_sale ? "green" : "gray"}>
                    Giảm giá
                  </Tag>
                  <Tag colorScheme={rowData.in_stock ? "green" : "gray"}>
                    Có sẵn
                  </Tag>
                </HStack>
              </Td>
              <Td>{moment(rowData.updated_at).format("HH:mm DD/MM/YYYY")}</Td>
              <Td>{moment(rowData.created_at).format("HH:mm DD/MM/YYYY")}</Td>
              <Td>
                <Menu placement="bottom-end">
                  <MenuButton>
                    <IconButton
                      aria-label="actions"
                      icon={<MdOutlineMoreHoriz fontSize="20" />}
                      colorScheme="gray"
                    />
                  </MenuButton>
                  <MenuList minW="100px" w="fit-content">
                    <MenuItem
                      icon={<AiOutlineEdit fontSize="20" />}
                      onClick={() =>
                        router.push(`/dashboard/products/${rowData.id}`)
                      }
                    >
                      Sửa
                    </MenuItem>
                    <MenuItem icon={<AiOutlineDelete fontSize="20" />}>
                      Xóa
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </NextTable>
  )
}
