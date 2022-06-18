import { Box, Divider, Grid, Skeleton, Stack } from "@chakra-ui/react"
import { NextBreadcrumb, NextModal, PageContainer } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout/MainLayout"
import {
  ProductDescription,
  ProductImagesPreview,
  ProductOrder,
  ProductPolicy,
  ProductReviews,
  ProductSummary,
} from "modules/products/components"
import { useGetProduct } from "modules/products/hooks"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { useRouter } from "next/router"
import { getArrayNumber } from "utils"

interface ProductProps {
  id: string
}

export function getServerSideProps({
  query,
}: GetServerSidePropsContext): GetServerSidePropsResult<
  PageProps & ProductProps
> {
  return {
    props: {
      title: PageTitle.PRODUCT_DETAIL,
      roles: [],
      id: String(query.id),
    },
  }
}

export default function Product({ id }: ProductProps) {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetProduct(id)

  return (
    <>
      <PageContainer>
        <NextBreadcrumb
          data={[
            {
              href: "/products",
              name: PageTitle.PRODUCT_LIST,
            },
            {
              href: `/products/${id}`,
              name: PageTitle.PRODUCT_DETAIL,
            },
          ]}
        />
        {isLoading && <LoadingSkeleton />}
        {data && (
          <Stack spacing="10">
            <Grid templateColumns="1fr 1fr" gap="40px">
              <ProductImagesPreview data={data} />
              <Stack spacing="10">
                <ProductSummary data={data} />
                <ProductOrder />
                <Divider />
                <ProductPolicy />
              </Stack>
            </Grid>
            <Divider />
            <ProductDescription />
            <Divider />
            <ProductReviews />
          </Stack>
        )}
      </PageContainer>
      <NextModal
        isOpen={isError}
        title="Lỗi 😵"
        closeText="Thử lại"
        confirmText="Quay lại trang trước"
        onClose={refetch}
        onConfirm={() => router.back()}
      >
        <Box>Không tìm thấy sản phẩm hoặc lỗi trang</Box>
      </NextModal>
    </>
  )
}
function LoadingSkeleton() {
  return (
    <Grid templateColumns="1fr 1fr" gap="40px">
      <Skeleton h="600px" borderRadius="16" />
      <Stack spacing="4">
        {getArrayNumber(6).map((item) => (
          <Skeleton h="40px" borderRadius="8" key={item} />
        ))}
        <Skeleton h="274px" borderRadius="8" />
      </Stack>
    </Grid>
  )
}
