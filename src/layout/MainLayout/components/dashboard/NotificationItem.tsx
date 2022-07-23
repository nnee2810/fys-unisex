import { Box, HStack, Text } from "@chakra-ui/react"
import { NextImage, NextLink } from "components"
import { Color } from "styles/theme"

export function NotificationItem() {
  return (
    <NextLink href="#">
      <HStack
        p="2"
        spacing="4"
        borderRadius="6"
        _hover={{ bg: Color.LIGHT_GRAY }}
      >
        <NextImage w="40px" h="40px" borderRadius="50%" />
        <Box>
          <Text maxW="400px">
            Đào Nam đã đặt đơn hàng mới, hãy kiểm tra ngay!
          </Text>
          <Text color={Color.DARK_GRAY}>2 phút trước</Text>
        </Box>
        <Box w="8px" h="8px" bgColor={Color.BLUE} borderRadius="50%" />
      </HStack>
    </NextLink>
  )
}
