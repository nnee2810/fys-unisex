import { Stack } from "@chakra-ui/react"
import { IPageProps } from "interfaces"
import {
  Banners,
  Commit,
  Explore,
  FeaturedProducts,
  FlashSale,
  Story,
} from "modules/home/components"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
  return {
    props: {
      title: "Trang chủ",
      roles: [],
    },
  }
}
export default function Home() {
  return (
    <Stack spacing="60px">
      <Banners />
      <Explore />
      <FlashSale />
      <FeaturedProducts />
      <Story />
      <Commit />
    </Stack>
  )
}
