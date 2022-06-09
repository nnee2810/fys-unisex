import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react"
import NextLink from "components/NextLink"
import { ILinkWithIcon } from "interfaces/ILink"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import {
  AiOutlineBell,
  AiOutlineFileText,
  AiOutlineSolution,
  AiOutlineStar,
} from "react-icons/ai"
import { IoTicketOutline } from "react-icons/io5"
import { TbLocation } from "react-icons/tb"
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
    icon: <TbLocation fontSize="20" />,
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

export default function UserLayout({ children }: ProfileLayoutProps) {
  const router = useRouter()

  return (
    <Grid templateColumns="200px auto" gap="50px">
      <Box>
        <Stack spacing="1" position="sticky" top="60px">
          {items.map((item, idx) => (
            <NextLink href={item.href} key={idx}>
              <HStack
                px="3"
                py="2"
                backgroundColor={
                  item.href === router.pathname ? Color.PRIMARY : "#fff"
                }
                color={item.href === router.pathname ? "#fff" : "#000"}
                borderRadius="6"
                transition="all .2s"
                _hover={{
                  backgroundColor:
                    item.href === router.pathname
                      ? Color.PRIMARY
                      : Color.LIGHT_GRAY,
                }}
              >
                {item.icon}
                <Text>{item.name}</Text>
              </HStack>
            </NextLink>
          ))}
        </Stack>
      </Box>
      <Box>{children}</Box>
    </Grid>
  )
}
