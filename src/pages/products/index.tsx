import { Box, Grid } from "@chakra-ui/react"
import Breadcrumb from "components/Breadcrumb"
import ModalConfirm from "components/ModalConfirm"
import { pagePadding, responsiveW } from "configs/constants"
import ProductList from "modules/products/components/products/ProductList"
import SearchProducts from "modules/products/components/products/SearchProducts"
import SortProducts from "modules/products/components/products/SortProducts"
import { GetProductsDto } from "modules/products/dto/get-products-dto"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
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
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetProducts(query)
  return (
    <>
      <Head>
        <title>{generateTitle("Sản phẩm")}</title>
      </Head>
      <Box w={{ ...responsiveW }} mx="auto" py={pagePadding}>
        <Breadcrumb
          data={[
            {
              name: "Trang chủ",
              href: "/",
            },
            {
              name: "Sản phẩm",
              href: "#",
            },
          ]}
        />
        <Grid templateColumns="300px 1fr" gap="40px">
          <SearchProducts query={query} isLoading={isLoading} />
          <Box>
            <SortProducts query={query} />
            <Box mt="6">
              <ProductList query={query} data={data} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </Box>
      <ModalConfirm
        isOpen={isError}
        title="Lỗi 😵"
        closeText="Thử lại"
        confirmText="Quay lại trang trước"
        onClose={refetch}
        onConfirm={() => router.back()}
      >
        <Box>Không tìm thấy sản phẩm hoặc lỗi trang</Box>
      </ModalConfirm>
    </>
  )
}
