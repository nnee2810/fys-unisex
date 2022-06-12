import { Box, Grid } from "@chakra-ui/react"
import { isNumber, isString } from "class-validator"
import { Breadcrumb, ModalConfirm, PageContainer } from "components"
import { IPageProps, ProductClassify, ProductSize } from "interfaces"
import {
  FormSearchProducts,
  ProductList,
  SortProducts,
} from "modules/products/components"
import { GetProductsDto, ProductSort } from "modules/products/dto"
import { useGetProducts } from "modules/products/hooks"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { useRouter } from "next/router"
import { deleteWhiteSpace } from "utils"

interface ProductsProps {
  query: GetProductsDto
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<IPageProps & ProductsProps>
> {
  const queryData: GetProductsDto = {}
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
  if (isNumber(query.minPrice)) queryData.minPrice = Number(query.minPrice)
  if (isNumber(query.maxPrice)) queryData.maxPrice = Number(query.maxPrice)

  return {
    props: {
      title: "Sản phẩm",
      roles: [],
      query: queryData,
    },
  }
}
export default function Products({ query }: ProductsProps) {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetProducts(query)
  return (
    <>
      <PageContainer>
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
          <FormSearchProducts query={query} isLoading={isLoading} />
          <Box>
            <SortProducts query={query} />
            <Box mt="6">
              <ProductList query={query} data={data} isLoading={isLoading} />
            </Box>
          </Box>
        </Grid>
      </PageContainer>
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
