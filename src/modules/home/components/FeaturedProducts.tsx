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
  Tabs,
} from "@chakra-ui/react"
import NextLink from "components/NextLink"
import { responsiveW, zIndex } from "configs/constants"
import { IProduct } from "interfaces/IProduct"
import ProductCard from "modules/products/components/ProductCard"
import React from "react"
import getArrayNumber from "utils/getArrayNumber"

interface FeaturedProductsProps {
  products?: IProduct[]
  isLoading?: boolean
}

export default function FeaturedProducts({
  products,
  isLoading,
}: FeaturedProductsProps) {
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
          products && (
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
                {["shirt", "pant", "accessory"].map((type, idx) => (
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
                      {products
                        .filter((product) => product.type === type)
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
            <Button>Khám phá gian hàng của DD Store</Button>
          </NextLink>
        </Center>
      </Box>
    </Box>
  )
}
