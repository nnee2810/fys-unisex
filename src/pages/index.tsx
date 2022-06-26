import { Stack } from "@chakra-ui/react"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
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
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: PageTitle.HOME,
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
