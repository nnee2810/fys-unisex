import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useBoolean,
} from "@chakra-ui/react"
import { NextButton } from "components"
import { PageTitle } from "configs/constants"
import { UserRole } from "interfaces/entities"
import { PageProps } from "layout"
import {
  DrawerCreateProduct,
  TableProduct,
} from "modules/dashboard/products/components"
import { useGetProductList } from "modules/products/hooks"
import { GetStaticPropsResult } from "next"
import { AiOutlineReload } from "react-icons/ai"
import { BiFilterAlt } from "react-icons/bi"

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
  const { data, isLoading, refetch, isRefetching } = useGetProductList({})
  const [openCreate, setOpenCreate] = useBoolean()
  const [openFilter, setOpenFilter] = useBoolean()

  return (
    <Box>
      <Stack>
        <Flex justifyContent="space-between">
          <NextButton onClick={setOpenCreate.on}>Thêm sản phẩm</NextButton>
          <HStack>
            <IconButton
              isLoading={isLoading || isRefetching}
              aria-label="refetch"
              icon={<AiOutlineReload fontSize="20" />}
              colorScheme="gray"
              onClick={() => refetch()}
            />
            <NextButton
              leftIcon={<BiFilterAlt fontSize="20" />}
              onClick={setOpenFilter.on}
            >
              Lọc
            </NextButton>
          </HStack>
        </Flex>

        <TableProduct data={data?.data || []} isLoading={isLoading} />
      </Stack>
      <DrawerCreateProduct isOpen={openCreate} onClose={setOpenCreate.off} />
    </Box>
  )
}
