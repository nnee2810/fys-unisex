import { Stack } from "@chakra-ui/react"
import { PageProps } from "layout"
import Banners from "modules/home/components/Banners"
import Commit from "modules/home/components/Commit"
import Explore from "modules/home/components/Explore"
import FeaturedProducts from "modules/home/components/FeaturedProducts"
import FlashSale from "modules/home/components/FlashSale"
import Story from "modules/home/components/Story"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: "Trang chủ",
      roles: [],
    },
  }
}
export default function Home() {
  const { data: flashSaleProducts, isLoading: isLoadingFlashSaleProducts } =
    useGetProducts({
      inSale: true,
      limit: 10,
    })
  const { data: featuredProducts, isLoading: isLoadingFeaturedProducts } =
    useGetProducts({
      isFeatured: true,
      limit: 30,
    })

  return (
    <Stack spacing="60px">
      <Banners />
      <Explore />
      <FlashSale
        products={flashSaleProducts?.data}
        isLoading={isLoadingFlashSaleProducts}
      />
      <FeaturedProducts
        products={featuredProducts?.data}
        isLoading={isLoadingFeaturedProducts}
      />
      <Story />
      <Commit />
    </Stack>
  )
}
