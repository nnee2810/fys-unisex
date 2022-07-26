import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Divider,
} from "@chakra-ui/react"
import { NextFlipMove, StackSkeleton } from "components"
import { useGetAddresses } from "modules/users/hooks"
import { AddressBox } from "./AddressBox"

export function AddressList() {
  const { data: dataGetAddresses, isLoading: isLoadingGetAddresses } =
    useGetAddresses()

  return (
    <Box>
      {isLoadingGetAddresses ? (
        <StackSkeleton value={5} h="100px" />
      ) : dataGetAddresses?.length ? (
        <NextFlipMove enterAnimation="fade" leaveAnimation="fade">
          {dataGetAddresses.map((address, idx) => (
            <Box key={address.id}>
              <AddressBox data={address} />
              {idx < dataGetAddresses.length - 1 && <Divider my="5" />}
            </Box>
          ))}
        </NextFlipMove>
      ) : (
        <Alert status="warning" borderRadius="6" variant="left-accent">
          <AlertIcon />
          <AlertDescription>Bạn chưa có địa chỉ nào</AlertDescription>
        </Alert>
      )}
    </Box>
  )
}
