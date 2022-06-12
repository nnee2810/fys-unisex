import { Box, Divider, Grid, Skeleton, Stack } from "@chakra-ui/react"
import { Breadcrumb, ModalConfirm, PageContainer } from "components"
import { IPageProps } from "interfaces"
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
import Head from "next/head"
import { useRouter } from "next/router"
import { getArrayNumber, getTitle } from "utils"

interface ProductProps {
  id: string
}

export function getServerSideProps({
  query,
}: GetServerSidePropsContext): GetServerSidePropsResult<
  IPageProps & ProductProps
> {
  return {
    props: {
      title: "Chi tiết sản phẩm",
      roles: [],
      id: String(query.id),
    },
  }
}

export default function Product({ id }: ProductProps) {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetProduct(id)
  console.log(data)

  return (
    <>
      <Head>
        <title>{getTitle(data?.name)}</title>
      </Head>
      <PageContainer>
        <Breadcrumb
          data={[
            {
              name: "Trang chủ",
              href: "/",
            },
            {
              name: "Sản phẩm",
              href: "/products",
            },
            {
              name: "Chi tiết sản phẩm",
              href: "#",
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
