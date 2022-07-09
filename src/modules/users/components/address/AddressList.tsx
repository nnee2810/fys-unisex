import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react"
import { NextAlertModal, StackSkeleton } from "components"
import { useGetAddressList } from "modules/users/hooks"
import { useRouter } from "next/router"
import FlipMove from "react-flip-move"
import { AddressBox } from "./AddressBox"

export function AddressList() {
  const router = useRouter()
  const {
    data: dataGetAddressList,
    isLoading: isLoadingGetAddressList,
    isError: isErrorGetAddressList,
    refetch: refetchGetAddressList,
  } = useGetAddressList()

  return (
    <Box>
      {isLoadingGetAddressList ? (
        <StackSkeleton value={5} h="100px" />
      ) : dataGetAddressList?.length ? (
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {dataGetAddressList.map((address, idx) => (
            <Box key={address.id}>
              <AddressBox data={address} />
              {idx < dataGetAddressList.length - 1 && <Divider my="5" />}
            </Box>
          ))}
        </FlipMove>
      ) : (
        <Alert status="warning" borderRadius="6" variant="left-accent">
          <AlertIcon />
          <AlertDescription>Bạn chưa có địa chỉ nào</AlertDescription>
        </Alert>
      )}
      <NextAlertModal
        isOpen={isErrorGetAddressList}
        title="Ôi không 😵"
        closeText="Thử lại"
        confirmText="Trang chủ"
        onClose={refetchGetAddressList}
        onConfirm={() => router.push("/")}
      >
        <Text>Không tìm thấy địa chỉ hoặc lỗi trang</Text>
      </NextAlertModal>
    </Box>
  )
}
