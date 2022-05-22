import { Stack } from "@chakra-ui/react"
import axios from "axios"
import { IProduct } from "interfaces/IProduct"
import { PageProps } from "layout"
import Banners from "modules/home/components/Banners"
import Commit from "modules/home/components/Commit"
import Explore from "modules/home/components/Explore"
import FeaturedProducts from "modules/home/components/FeaturedProducts"
import FlashSale from "modules/home/components/FlashSale"
import Story from "modules/home/components/Story"
import { getProducts } from "modules/products/services/getProducts"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"

interface HomeProps {
  flashSaleProducts: IProduct[]
  featuredProducts: IProduct[]
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps & HomeProps>> {
  const [flashSaleProducts, featuredProducts] = await axios.all([
    getProducts({
      isSale: true,
      limit: 10,
    }),
    getProducts({
      isFeatured: true,
      limit: 30,
    }),
  ])

  return {
    props: {
      title: "Trang chủ",
      protected: false,
      featuredProducts: featuredProducts.data || [],
      flashSaleProducts: flashSaleProducts.data || [],
    },
  }
}

export default function Home({
  flashSaleProducts,
  featuredProducts,
}: HomeProps) {
  return (
    <Stack spacing="60px">
      <Banners />
      <Explore />
      <FlashSale products={flashSaleProducts} />
      <FeaturedProducts products={featuredProducts} />
      <Story />
      <Commit />
    </Stack>
  )
}
