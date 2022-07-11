import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react"
import { NextLink } from "components"
import { ILinkWithIcon } from "interfaces"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import {
  AiOutlineBell,
  AiOutlineFileText,
  AiOutlineSolution,
  AiOutlineStar,
} from "react-icons/ai"
import { IoTicketOutline } from "react-icons/io5"
import { MdOutlineLocationOn } from "react-icons/md"
import { Color } from "styles/theme"

interface ProfileLayoutProps {
  children: ReactNode
}

const items: ILinkWithIcon[] = [
  {
    name: "Tài khoản của tôi",
    href: "/user/profile",
    icon: <AiOutlineSolution fontSize="20" />,
  },
  {
    name: "Địa chỉ",
    href: "/user/address",
    icon: <MdOutlineLocationOn fontSize="20" />,
  },
  {
    name: "Đơn mua",
    href: "/user/orders",
    icon: <AiOutlineFileText fontSize="20" />,
  },
  {
    name: "Thông báo",
    href: "/user/notifications",
    icon: <AiOutlineBell fontSize="20" />,
  },
  {
    name: "Đánh giá",
    href: "/user/reviews",
    icon: <AiOutlineStar fontSize="20" />,
  },
  {
    name: "Ví voucher",
    href: "/user/voucher",
    icon: <IoTicketOutline fontSize="20" />,
  },
]

export function UserLayout({ children }: ProfileLayoutProps) {
  const router = useRouter()

  return (
    <Grid templateColumns="300px auto" gap="50px">
      <Stack spacing="1">
        {items.map((item, idx) => (
          <Box pos="relative" key={idx}>
            <NextLink href={item.href}>
              <HStack
                px="3"
                py="2"
                bg={item.href === router.pathname ? Color.PRIMARY : "#fff"}
                color={item.href === router.pathname ? "#fff" : "#000"}
                borderRadius="6"
                transition="all .2s"
                _hover={{
                  bg:
                    item.href === router.pathname
                      ? Color.PRIMARY
                      : Color.LIGHT_GRAY,
                }}
              >
                {item.icon}
                <Text>{item.name}</Text>
              </HStack>
            </NextLink>
            {item.href === router.pathname && (
              <Box
                pos="absolute"
                top="3px"
                left="-8px"
                w="4px"
                h="29px"
                bg={Color.PRIMARY}
                borderRadius="2"
              />
            )}
          </Box>
        ))}
      </Stack>
      <Box>{children}</Box>
    </Grid>
  )
}
