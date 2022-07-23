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
} from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductEntity } from "interfaces/entities"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { formatCurrency, formatDatetime, getAwsCloudFrontUrl } from "utils"

interface RowProductProps {
  data: IProductEntity
  onSelectUpdate: () => void
  onSelectDelete: () => void
}

export function RowProduct({
  data,
  onSelectUpdate,
  onSelectDelete,
}: RowProductProps) {
  return (
    <>
      <Td>
        <HStack>
          <NextImage
            w="46px"
            h="46px"
            borderRadius="6"
            src={getAwsCloudFrontUrl(data.images?.[0]?.key)}
          />
          <Text>{data.name}</Text>
        </HStack>
      </Td>

      <Td>
        <Tag>{data.classify}</Tag>
      </Td>
      <Td>
        {formatCurrency(data.price)} / {formatCurrency(data.sale_price)}
      </Td>
      <Td>
        <HStack justifyContent="center">
          <Tag colorScheme={data.for_sale ? "green" : "gray"}>Đang bán</Tag>
          <Tag colorScheme={data.in_sale ? "green" : "gray"}>Đang sale</Tag>
          <Tag colorScheme={data.in_stock ? "green" : "gray"}>Có sẵn</Tag>
        </HStack>
      </Td>
      <Td>{formatDatetime(data.updated_at)}</Td>
      <Td>{formatDatetime(data.created_at)}</Td>
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
    </>
  )
}
