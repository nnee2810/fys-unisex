import { Box } from "@chakra-ui/react"
import { IProduct } from "interfaces/IProduct"
import Banners from "modules/home/components/Banners"
import Commit from "modules/home/components/Commit"
import Explore from "modules/home/components/Explore"
import FeaturedProducts from "modules/home/components/FeaturedProducts"
import FlashSale from "modules/home/components/FlashSale"
import Story from "modules/home/components/Story"
import { getProducts } from "modules/products/services/getProducts"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { generateTitle } from "utils/generateTitle"

interface HomeProps {
  flashSaleProducts: IProduct[]
  featuredProducts: IProduct[]
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomeProps>> {
  const flashSaleProducts =
    (
      await getProducts({
        isSale: true,
        limit: 10,
      })
    ).data || []
  const featuredProducts =
    (
      await getProducts({
        isFeatured: true,
        limit: 30,
      })
    ).data || []

  return {
    props: {
      featuredProducts,
      flashSaleProducts,
    },
  }
}

export default function Home({
  flashSaleProducts,
  featuredProducts,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>{generateTitle("Home")}</title>
      </Head>
      <Box>
        <Banners />
        <Explore />
        <FlashSale products={flashSaleProducts} />
        <FeaturedProducts products={featuredProducts} />
        <Story />
        <Commit />
      </Box>
    </>
  )
}
