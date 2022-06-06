import { Box, Divider, Grid, Skeleton, Stack } from "@chakra-ui/react"
import Breadcrumb from "components/Breadcrumb"
import Modal from "components/ModalConfirm"
import PageContainer from "components/PageContainer"
import { IPageProps } from "interfaces/IPageProps"
import ProductDescription from "modules/products/components/product/ProductDescription"
import ProductImagesPreview from "modules/products/components/product/ProductImagesPreview"
import ProductOrder from "modules/products/components/product/ProductOrder"
import ProductPolicy from "modules/products/components/product/ProductPolicy"
import ProductReviews from "modules/products/components/product/ProductReviews"
import ProductSummary from "modules/products/components/product/ProductSummary"
import { useGetProduct } from "modules/products/hooks/useGetProduct"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import getArrayNumber from "utils/getArrayNumber"
import { getTitle } from "utils/getTitle"

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
      <Modal
        isOpen={isError}
        title="Lỗi 😵"
        closeText="Thử lại"
        confirmText="Quay lại trang trước"
        onClose={refetch}
        onConfirm={() => router.back()}
      >
        <Box>Không tìm thấy sản phẩm hoặc lỗi trang</Box>
      </Modal>
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
