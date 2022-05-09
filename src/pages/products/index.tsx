import { Box, Grid } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import FormSearchProducts from "modules/products/components/FormSearchProducts"
import FormSortProducts from "modules/products/components/FormSortProducts"
import ProductList from "modules/products/components/ProductList"
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
  if (!isNaN(Number(query.minPrice)))
    queryData.minPrice = Number(query.minPrice)
  if (!isNaN(Number(query.maxPrice)))
    queryData.maxPrice = Number(query.maxPrice)

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
      <Grid
        w={{ ...responsiveW }}
        mx="auto"
        py="40px"
        templateColumns="300px 1fr"
        gap="40px"
      >
        <FormSearchProducts query={query} isLoading={isLoading} />
        <Box>
          <FormSortProducts query={query} data={data} isLoading={isLoading} />
          <Box mt="6">
            <ProductList query={query} data={data} isLoading={isLoading} />
          </Box>
        </Box>
      </Grid>
    </>
  )
}
