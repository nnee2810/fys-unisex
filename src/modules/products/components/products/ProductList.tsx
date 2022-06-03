import { Box, Grid, Skeleton, Text } from "@chakra-ui/react"
import Pagination from "components/Pagination"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import ProductCard from "modules/products/components/ProductCard"
import { GetProductsDto } from "modules/products/dto/get-products-dto"
import { useRouter } from "next/router"
import qs from "query-string"
import getArrayNumber from "utils/getArrayNumber"

interface ProductListProps {
  query: GetProductsDto
  data?: IPaginationResponse<IProduct[]>
  isLoading?: boolean
}

export default function ProductList({
  query,
  data,
  isLoading,
}: ProductListProps) {
  const router = useRouter()
  const handleChange = (selectedItem: { selected: number }) => {
    const queryString = qs.stringify({
      ...query,
      page: selectedItem.selected + 1,
    })
    router.push(`?${queryString}`)
  }
  return (
    <Box>
      {isLoading ? (
        <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
          {getArrayNumber(8).map((item) => (
            <Skeleton h="300px" borderRadius="8" key={item} />
          ))}
        </Grid>
      ) : data?.data?.length ? (
        <>
          <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
            {data.data.map((product) => (
              <ProductCard data={product} layout="vertical" key={product.id} />
            ))}
          </Grid>
          <Pagination
            forcePage={data.page - 1 || 0}
            pageCount={Math.ceil(data.total / data.limit)}
            onPageChange={handleChange}
          />
        </>
      ) : (
        <Text align="center" fontWeight="500">
          Không tìm thấy sản phẩm nào
        </Text>
      )}
    </Box>
  )
}
