import { AspectRatio, Box, Grid, Stack, Text } from "@chakra-ui/react"
import { NextLink } from "components"
import { responsiveW } from "configs/constants"
import { ILink } from "interfaces"
import styled from "styled-components"
import { Color } from "styles/theme"

const footerItems: {
  label: string
  childs: ILink[]
}[] = [
  {
    label: "Khám phá",
    childs: [
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
    ],
  },
  {
    label: "Dịch vụ",
    childs: [
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
    ],
  },
]

export default function Footer() {
  return (
    <Box bg={Color.PRIMARY} py="60px">
      <Grid
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap="40px"
        w={{ ...responsiveW }}
        mx="auto"
        bg={Color.PRIMARY}
        color="white"
      >
        {footerItems.map((item, idx) => (
          <Box key={idx}>
            <SectionTitle>{item.label}</SectionTitle>
            <Stack alignItems="flex-start">
              {item.childs.map((child, idx) => (
                <NextLink href={child.href} styleOnHover key={idx}>
                  {child.name}
                </NextLink>
              ))}
            </Stack>
          </Box>
        ))}
        <Box>
          <SectionTitle>Mạng xã hội</SectionTitle>
        </Box>
        <Box>
          <SectionTitle>Liên hệ</SectionTitle>
          <Stack>
            <Text>
              <u>Cơ sở 1</u>: Số 103, Đường Vạn Phúc, Phường Vạn Phúc, Quận Hà
              Đông, TP. Hà Nội
            </Text>
            <Text>Hotline: 034.567.7890</Text>
            <Text>Email: fys@gmail.com</Text>
            <AspectRatio ratio={4 / 3}>
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.980384380735!2d105.81945410764918!3d21.022778763202346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5d5161f909%3A0x4dafaf500ce22be3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIHRoxrDGoW5n!5e0!3m2!1svi!2s!4v1649779753214!5m2!1svi!2s"
                style={{ border: "0" }}
                loading="lazy"
              ></iframe>
            </AspectRatio>
          </Stack>
        </Box>
      </Grid>
    </Box>
  )
}

const SectionTitle = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
`
