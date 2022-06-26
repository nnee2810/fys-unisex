import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react"
import { NextLink } from "components"
import { responsiveW, zIndex } from "configs/constants"
import { ProductCard } from "modules/products/components"
import { useGetProductList } from "modules/products/hooks"
import { ProductClassify } from "modules/products/interfaces"
import { getArrayNumber } from "utils"

export function FeaturedProducts() {
  const { data, isLoading } = useGetProductList({
    is_featured: true,
    take: 30,
  })

  return (
    <Box>
      <Heading textAlign="center">Sản phẩm nổi bật</Heading>
      <Box w={{ ...responsiveW }} mt="6" mx="auto">
        {isLoading ? (
          <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
            {getArrayNumber(4).map((item) => (
              <Skeleton h="300px" borderRadius="8" key={item} />
            ))}
          </Grid>
        ) : (
          data?.data?.length && (
            <Tabs align="center">
              <TabList
                position="sticky"
                top="0"
                bg="white"
                zIndex={zIndex.FEATURED_TABS}
              >
                <Tab>Áo</Tab>
                <Tab>Quần</Tab>
                <Tab>Phụ kiện</Tab>
              </TabList>
              <TabPanels>
                {Object.keys(ProductClassify).map((classify, idx) => (
                  <TabPanel key={idx} px="0">
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                      }}
                      gap="5"
                    >
                      {data.data
                        .filter((product) => product.classify === classify)
                        .map((product) => (
                          <ProductCard
                            data={product}
                            layout="vertical"
                            key={product.id}
                          />
                        ))}
                    </Grid>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          )
        )}

        <Center my="6">
          <NextLink href="/products">
            <Button>Khám phá gian hàng của FYS Unisex</Button>
          </NextLink>
        </Center>
      </Box>
    </Box>
  )
}
