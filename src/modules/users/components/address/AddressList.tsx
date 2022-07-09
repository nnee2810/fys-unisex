import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Divider,
} from "@chakra-ui/react"
import { StackSkeleton } from "components"
import { useGetAddressList } from "modules/users/hooks"
import FlipMove from "react-flip-move"
import { AddressBox } from "./AddressBox"

export function AddressList() {
  const { data: dataGetAddressList, isLoading: isLoadingGetAddressList } =
    useGetAddressList()

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
    </Box>
  )
}
