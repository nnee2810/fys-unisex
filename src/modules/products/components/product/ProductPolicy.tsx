import { Box, Grid, Stack, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsHeadset } from "react-icons/bs"
import { GrDeliver } from "react-icons/gr"
import { IoPhonePortraitOutline, IoTicketOutline } from "react-icons/io5"

interface PolicyItem {
  icon: ReactNode
  content: string
}
const policies: PolicyItem[] = [
  {
    icon: <IoPhonePortraitOutline />,
    content: "Đổi trả cực dễ chỉ cần số điện thoại",
  },
  {
    icon: <IoTicketOutline />,
    content: "Miễn phí vận chuyển cho đơn hàng trên 200k",
  },
  {
    icon: <AiOutlineClockCircle />,
    content: "Đến tận nơi nhận hàng trả, hoàn tiền trong 24h",
  },
  { icon: <GrDeliver />, content: "Giao hàng nhanh toàn quốc" },
  {
    icon: <BsHeadset />,
    content: "Hotline 0123.456.789 hỗ trợ từ 8h30 - 22h mỗi ngày",
  },
]

export default function ProductPolicy() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="5">
      {policies.map((item, idx) => (
        <Stack alignItems="center" key={idx}>
          <Box fontSize="24">{item.icon}</Box>
          <Text align="center" fontSize="12" fontWeight="500">
            {item.content}
          </Text>
        </Stack>
      ))}
    </Grid>
  )
}
