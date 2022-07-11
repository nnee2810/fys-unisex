import {
  Box,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Text,
} from "@chakra-ui/react"
import { Badge, PopoverTrigger } from "components"
import { AiOutlineBell } from "react-icons/ai"
import { getArrayNumber } from "utils"
import { NotificationItem } from "."

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <Flex px="8" py="4" justifyContent="space-between">
      <Heading size="lg">{title}</Heading>
      <HStack>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Box cursor="pointer">
              <Badge value={9}>
                <AiOutlineBell fontSize="24" />
              </Badge>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Flex justifyContent="space-between">
                <Text fontWeight="700">Thông báo</Text>
                <Text cursor="pointer">Đánh dấu đã đọc tất cả</Text>
              </Flex>
            </PopoverHeader>
            <PopoverBody maxH="336px" overflow="auto">
              {getArrayNumber(10).map((item) => (
                <NotificationItem key={item} />
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  )
}
