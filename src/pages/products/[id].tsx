import { Box, Divider, Grid, Skeleton, Stack } from "@chakra-ui/react"
import { NextBreadcrumb, PageContainer } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
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
  const { data, isLoading } = useGetProduct(id)

  return (
    <Box>
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
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data && (
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
          )
        )}
      </PageContainer>
    </Box>
  )
}
function LoadingSkeleton() {
  return (
    <Grid templateColumns="1fr 1fr" gap="40px">
      <Skeleton h="600px" borderRadius="16" />
      <Stack spacing="4">
        {getArrayNumber(6).map((item) => (
          <Skeleton h="40px" borderRadius="6" key={item} />
        ))}
        <Skeleton h="274px" borderRadius="6" />
      </Stack>
    </Grid>
  )
}
