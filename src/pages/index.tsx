import { Stack } from "@chakra-ui/react"
import { IPageProps } from "interfaces/IPageProps"
import Banners from "modules/home/components/Banners"
import Commit from "modules/home/components/Commit"
import Explore from "modules/home/components/Explore"
import FeaturedProducts from "modules/home/components/FeaturedProducts"
import FlashSale from "modules/home/components/FlashSale"
import Story from "modules/home/components/Story"
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
