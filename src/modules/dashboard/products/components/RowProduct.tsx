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
import { IProductEntity } from "interfaces/entities"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { Row } from "react-table"
import { formatCurrency, formatDatetime, getAwsCloudFrontUrl } from "utils"

interface RowProductProps {
  row: Row<IProductEntity>
  onSelectUpdate: () => void
  onSelectDelete: () => void
}

export function RowProduct({
  row: { getRowProps, original },
  onSelectUpdate,
  onSelectDelete,
}: RowProductProps) {
  return (
    <Tr {...getRowProps()}>
      <Td>
        <HStack>
          <NextImage
            w="46px"
            h="46px"
            borderRadius="6"
            src={getAwsCloudFrontUrl(original.images?.[0]?.key)}
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
          <Tag colorScheme={original.for_sale ? "green" : "gray"}>Đang bán</Tag>
          <Tag colorScheme={original.in_sale ? "green" : "gray"}>Đang sale</Tag>
          <Tag colorScheme={original.in_stock ? "green" : "gray"}>Có sẵn</Tag>
        </HStack>
      </Td>
      <Td>{formatDatetime(original.updated_at)}</Td>
      <Td>{formatDatetime(original.created_at)}</Td>
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
              onClick={onSelectUpdate}
            >
              Sửa
            </MenuItem>
            <MenuItem
              icon={<AiOutlineDelete fontSize="20" />}
              onClick={onSelectDelete}
            >
              Xóa
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}
