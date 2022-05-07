import { Box, Grid } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import ProductList from "modules/products/components/ProductList"
import SearchForm from "modules/products/components/SearchForm"
import SortForm from "modules/products/components/SortForm"
import { GetProductsDto } from "modules/products/dto/get-products-dto"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import { generateTitle } from "utils/generateTitle"

interface ProductsProps {
  query: GetProductsDto
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<ProductsProps>
> {
  const queryData: GetProductsDto = {}
  if (query.name) queryData.name = deleteWhiteSpace(String(query.name))
  if (query.size) queryData.size = String(query.size)
  if (query.sort) queryData.sort = String(query.sort)
  if (query.type) queryData.type = String(query.type)
  if (!isNaN(Number(query.page))) queryData.page = Number(query.page)

  return {
    props: {
      query: queryData,
    },
  }
}

export default function Products({ query }: ProductsProps) {
  const { data, isLoading } = useGetProducts(query)
  return (
    <>
      <Head>
        <title>{generateTitle("Sản phẩm")}</title>
      </Head>
      <Box py="40px">
        <Grid
          w={{ ...responsiveW }}
          mx="auto"
          templateColumns="300px 1fr"
          gap="40px"
        >
          <SearchForm query={query} isLoading={isLoading} />
          <Box>
            <SortForm query={query} data={data} />
            <Box mt="6">
              <ProductList query={query} data={data} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  )
}
