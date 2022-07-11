import { Box } from "@chakra-ui/react"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import {
  FormSearchProducts,
  ProductList,
} from "modules/dashboard/products/components"
import { useGetProductList } from "modules/products/hooks"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      isDashboard: true,
      roles: [UserRole.MOD, UserRole.ADMIN],
      title: PageTitle.DASHBOARD_PRODUCTS,
    },
  }
}

export default function DashboardProducts() {
  const { data, isLoading } = useGetProductList({})
  return (
    <Box>
      <FormSearchProducts />
      <ProductList data={data?.data || []} />
    </Box>
  )
}
