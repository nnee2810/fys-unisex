import { Box, Grid } from "@chakra-ui/react"
import { isNumber, isString } from "class-validator"
import { NextBreadcrumb, PageContainer } from "components"
import { PageTitle } from "configs/constants"
import { ProductClassify, ProductSize } from "interfaces/entities"
import { PageProps } from "layout"
import {
  FormSearchProducts,
  ProductList,
  SortProducts,
} from "modules/products/components"
import { GetProductListDto, ProductSort } from "modules/products/dto"
import { useGetProductList } from "modules/products/hooks"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { deleteWhiteSpace } from "utils"

interface ProductsProps {
  query: GetProductListDto
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<PageProps & ProductsProps>
> {
  const queryData: GetProductListDto = {}
  if (isString(query.name)) queryData.name = deleteWhiteSpace(query.name)
  if (isString(query.size) && Object.keys(ProductSize).includes(query.size))
    queryData.size = query.size as ProductSize
  if (isString(query.sort) && Object.keys(ProductSort).includes(query.sort))
    queryData.sort = query.sort as ProductSort
  if (
    isString(query.classify) &&
    Object.keys(ProductClassify).includes(query.classify)
  )
    queryData.classify = query.classify as ProductClassify
  if (isNumber(query.page)) queryData.page = Number(query.page)
  if (isNumber(query.min_price)) queryData.min_price = Number(query.min_price)
  if (isNumber(query.max_price)) queryData.max_price = Number(query.max_price)

  return {
    props: {
      title: PageTitle.PRODUCTS,
      roles: [],
      query: queryData,
    },
  }
}
export default function Products({ query }: ProductsProps) {
  const { data, isLoading } = useGetProductList(query)

  return (
    <Box>
      <PageContainer>
        <NextBreadcrumb
          data={[
            {
              href: "/products",
              name: PageTitle.PRODUCTS,
            },
          ]}
        />
        <Grid templateColumns="300px 1fr" gap="40px">
          <FormSearchProducts query={query} isLoading={isLoading} />
          <Box>
            <SortProducts query={query} />
            <Box mt="6">
              <ProductList query={query} data={data} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </PageContainer>
    </Box>
  )
}
