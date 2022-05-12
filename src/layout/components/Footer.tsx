import { AspectRatio, Box, Grid, Stack, Text } from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import { responsiveW } from "configs/constants"
import { ILinkItem } from "interfaces/ILinkItem"
import React, { ReactNode } from "react"
import { colors } from "styles/theme"

interface Item {
  title: string
  content: ReactNode
}

const exploreItems: ILinkItem[] = [
  {
    name: "Đồ nam",
    href: "#",
  },
  {
    name: "Đồ nữ",
    href: "#",
  },
  {
    name: "Phụ kiện",
    href: "#",
  },
  {
    name: "Set đồ",
    href: "#",
  },
]
const serviceItems: ILinkItem[] = [
  {
    name: "Hỏi đáp - FAQs",
    href: "#",
  },
  {
    name: "Chính sách khuyến mãi",
    href: "#",
  },
  {
    name: "Chính sách giao hàng",
    href: "#",
  },
  {
    name: "Chính sách đổi trả",
    href: "#",
  },
]

const footerItems: Item[] = [
  {
    title: "Khám phá DDStore",
    content: (
      <Stack>
        {exploreItems.map((item, idx) => (
          <Box key={idx}>
            <CustomLink href={item.href}>{item.name}</CustomLink>
          </Box>
        ))}
      </Stack>
    ),
  },
  {
    title: "Dịch vụ khách hàng",
    content: (
      <Stack>
        {serviceItems.map((item, idx) => (
          <Box key={idx}>
            <CustomLink href={item.href}>{item.name}</CustomLink>
          </Box>
        ))}
      </Stack>
    ),
  },
  {
    title: "Mạng xã hội",
    content: (
      <Box
        w="100%"
        className="fb-page"
        data-href="https://www.facebook.com/dungct.tructiepgame"
        data-tabs=""
        data-width=""
        data-height=""
        data-small-header="false"
        data-hide-cover="false"
        data-show-facepile="false"
        data-adapt-container-width="true"
      >
        <blockquote
          cite="https://www.facebook.com/dungct.tructiepgame"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/dungct.tructiepgame">Dũng CT</a>
        </blockquote>
      </Box>
    ),
  },
  {
    title: "Liên hệ",
    content: (
      <Stack>
        <Text>
          <u>Cơ sở 1</u>: Số 103, Đường Vạn Phúc, Phường Vạn Phúc, Quận Hà Đông,
          TP. Hà Nội
        </Text>
        <Text>Hotline: 034.567.7890</Text>
        <Text>Email: ddstore@gmail.com</Text>
        <AspectRatio ratio={4 / 3}>
          <iframe
            title="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.980384380735!2d105.81945410764918!3d21.022778763202346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5d5161f909%3A0x4dafaf500ce22be3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIHRoxrDGoW5n!5e0!3m2!1svi!2s!4v1649779753214!5m2!1svi!2s"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </AspectRatio>
      </Stack>
    ),
  },
]

export default function Footer() {
  return (
    <Box bg={colors.primary} py="60px">
      <Grid
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap="40px"
        w={{ ...responsiveW }}
        mx="auto"
        bg={colors.primary}
        color="white"
      >
        {footerItems.map((item, idx) => (
          <Box key={idx}>
            <Box pos="relative">
              <Text fontSize="18" fontWeight="500" textTransform="uppercase">
                {item.title}
              </Text>
              <Box pos="absolute" w="40px" h="2px" bg="white" />
            </Box>
            <Box mt="6" fontSize="12">
              {item.content}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
