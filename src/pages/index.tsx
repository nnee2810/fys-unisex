import { Stack } from "@chakra-ui/react"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import {
  Banners,
  Commit,
  FeaturedProducts,
  FlashSale,
  Story,
} from "modules/home/components"
import { GetStaticPropsResult } from "next"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
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
      {/* <Explore /> */}
      <FlashSale />
      <FeaturedProducts />
      <Story />
      <Commit />
    </Stack>
  )
}
