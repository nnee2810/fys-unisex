import { Box, Grid, Skeleton, Stack } from "@chakra-ui/react"
import CustomBreadcrumb from "components/CustomBreadcrumb"
import CustomModal from "components/CustomModal"
import { pagePadding, responsiveW } from "configs/constants"
import ProductImagesPreview from "modules/products/components/product/ProductImagesPreview"
import ProductOrder from "modules/products/components/product/ProductOrder"
import ProductSummary from "modules/products/components/product/ProductSummary"
import { useGetProduct } from "modules/products/hooks/useGetProduct"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import generateArrayNumber from "utils/generateArrayNumber"
import { generateTitle } from "utils/generateTitle"

interface ProductProps {
  id: string
}

export function getServerSideProps({
  query,
}: GetServerSidePropsContext): GetServerSidePropsResult<ProductProps> {
  return {
    props: {
      id: String(query.id),
    },
  }
}

export default function Product({ id }: ProductProps) {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetProduct(id)

  return (
    <>
      <Head>
        <title>{generateTitle(data?.name)}</title>
      </Head>
      <Box w={{ ...responsiveW }} mx="auto" py={pagePadding}>
        <CustomBreadcrumb
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
          <Grid templateColumns="1fr 1fr" gap="40px">
            <ProductImagesPreview data={data} />
            <Box>
              <ProductSummary data={data} />
              <ProductOrder />
            </Box>
          </Grid>
        )}
      </Box>
      <CustomModal
        isOpen={isError}
        title="Lỗi 😵"
        closeText="Thử lại"
        confirmText="Quay lại trang trước"
        onClose={refetch}
        onConfirm={() => router.back()}
      >
        <Box>Không tìm thấy sản phẩm hoặc lỗi trang</Box>
      </CustomModal>
    </>
  )
}
function LoadingSkeleton() {
  return (
    <Grid templateColumns="1fr 1fr" gap="40px">
      <Skeleton h="600px" borderRadius="16" />
      <Stack spacing="4">
        {generateArrayNumber(6).map((item) => (
          <Skeleton h="40px" borderRadius="8" key={item} />
        ))}
        <Skeleton h="274px" borderRadius="8" />
      </Stack>
    </Grid>
  )
}
