import { Box, Flex, Stack, useBoolean } from "@chakra-ui/react"
import { NextButton } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import {
  DrawerCreateProduct,
  DrawerFilterProducts,
  ProductList,
} from "modules/dashboard/products/components"
import { useGetProductList } from "modules/products/hooks"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsResult } from "next"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
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
  const [openCreate, setOpenCreate] = useBoolean()
  const [openFilter, setOpenFilter] = useBoolean()

  return (
    <Box>
      <Stack>
        <Flex justifyContent="space-between">
          <NextButton onClick={setOpenCreate.on}>Thêm sản phẩm</NextButton>
          <NextButton onClick={setOpenFilter.on}>Lọc sản phẩm</NextButton>
        </Flex>
        <DrawerFilterProducts isOpen={openFilter} onClose={setOpenFilter.off} />
        <ProductList data={data?.data || []} isLoading={isLoading} />
      </Stack>
      <DrawerCreateProduct isOpen={openCreate} onClose={setOpenCreate.off} />
    </Box>
  )
}
