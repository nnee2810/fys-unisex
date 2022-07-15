import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductEntity } from "modules/products/interfaces"
import moment from "moment"
import router from "next/router"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { Row } from "react-table"
import { formatCurrency } from "utils"

interface ProductRowProps {
  row: Row<IProductEntity>
}

export function ProductRow({
  row: { getRowProps, original },
}: ProductRowProps) {
  return (
    <Tr {...getRowProps()}>
      <Td>
        <HStack>
          <NextImage
            w="40px"
            h="40px"
            borderRadius="6"
            src={original.images?.[0]}
            alt={original.name}
          />
          <Text>{original.name}</Text>
        </HStack>
      </Td>

      <Td>
        <Tag>{original.classify}</Tag>
      </Td>
      <Td>
        {formatCurrency(original.price)} / {formatCurrency(original.sale_price)}
      </Td>
      <Td>
        <HStack justifyContent="center">
          <Tag colorScheme={original.on_sale ? "green" : "gray"}>Đang bán</Tag>
          <Tag colorScheme={original.in_sale ? "green" : "gray"}>Giảm giá</Tag>
          <Tag colorScheme={original.in_stock ? "green" : "gray"}>Có sẵn</Tag>
        </HStack>
      </Td>
      <Td>{moment(original.updated_at).format("HH:mm DD/MM/YYYY")}</Td>
      <Td>{moment(original.created_at).format("HH:mm DD/MM/YYYY")}</Td>
      <Td>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="actions"
            icon={<MdOutlineMoreHoriz fontSize="20" />}
            colorScheme="gray"
          />

          <MenuList minW="100px" w="fit-content">
            <MenuItem
              icon={<AiOutlineEdit fontSize="20" />}
              onClick={() => router.push(`/dashboard/products/${original.id}`)}
            >
              Sửa
            </MenuItem>
            <MenuItem icon={<AiOutlineDelete fontSize="20" />}>Xóa</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}
