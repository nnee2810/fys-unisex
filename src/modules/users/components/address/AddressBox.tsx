import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import { NextAlertModal } from "components"
import { IAddressEntity } from "interfaces/entities"
import { useUpdateAddress } from "modules/users/hooks"
import { deleteAddress } from "modules/users/services"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineLocationOn, MdOutlineMoreHoriz } from "react-icons/md"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import styled from "styled-components"
import { Color } from "styles/theme"
import ModalUpdateAddress from "./ModalUpdateAddress"

interface AddressBoxProps {
  data: IAddressEntity
}

export function AddressBox({ data }: AddressBoxProps) {
  const queryClient = useQueryClient()
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    useUpdateAddress()
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    "delete-address",
    deleteAddress
  )
  const [openUpdate, setOpenUpdate] = useBoolean()
  const [openDelete, setOpenDelete] = useBoolean()

  const handleUpdateDefault = () => {
    if (isLoadingUpdate) return
    mutateUpdate(
      {
        id: data.id,
        is_default: true,
      },
      {
        onSuccess() {
          toast.success("Đặt địa chỉ mặc định thành công")
          queryClient.invalidateQueries("get-address-list")
        },
      }
    )
  }
  const handleDelete = () => {
    mutateDelete(data.id, {
      onSuccess() {
        setOpenDelete.off()
        toast.success("Xóa địa chị chỉ thành công")
        queryClient.invalidateQueries("get-address-list")
      },
    })
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <AddressInfo>
          <Flex>
            <Text>Họ tên</Text>
            <HStack>
              <Text>{data.name}</Text>
              {data.is_default && (
                <Tag bgColor={Color.GREEN} color="#fff">
                  Mặc định
                </Tag>
              )}
            </HStack>
          </Flex>
          <Flex>
            <Text>Số điện thoại</Text>
            <Text>{data.phone}</Text>
          </Flex>
          <Flex>
            <Text>Địa chỉ</Text>
            <Box>
              <Text>{data.address_detail}</Text>
              <Text>{data.address}</Text>
            </Box>
          </Flex>
        </AddressInfo>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="actions"
            icon={<MdOutlineMoreHoriz fontSize="20" />}
          />
          <MenuList minW="100px" w="fit-content">
            {!data.is_default && (
              <MenuItem
                icon={<MdOutlineLocationOn fontSize="20" />}
                onClick={handleUpdateDefault}
              >
                Đặt làm mặc định
              </MenuItem>
            )}
            <MenuItem
              icon={<AiOutlineEdit fontSize="20" />}
              onClick={setOpenUpdate.on}
            >
              Sửa
            </MenuItem>
            {!data.is_default && (
              <MenuItem
                icon={<AiOutlineDelete fontSize="20" />}
                onClick={setOpenDelete.on}
              >
                Xóa
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
      <ModalUpdateAddress
        isOpen={openUpdate}
        data={data}
        onClose={setOpenUpdate.off}
      />
      <NextAlertModal
        isOpen={openDelete}
        title="Xóa địa chỉ"
        confirmText="Xóa"
        onClose={setOpenDelete.off}
        onConfirm={handleDelete}
        isLoading={isLoadingDelete}
      >
        <Box>Bạn có chắc muốn xoá địa chỉ này?</Box>
      </NextAlertModal>
    </Box>
  )
}

const AddressInfo = styled(Box)`
  & > div {
    margin-bottom: 6px;
    & > p:first-child {
      width: 120px;
      font-weight: 600;
    }
  }
`
