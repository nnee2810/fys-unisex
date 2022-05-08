import {
  Box,
  Button,
  Center,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import ProductItem from "components/ProductItem"
import { responsiveW, zIndex } from "configs/constants"
import { IProduct } from "interfaces/IProduct"
import React from "react"
import { SectionTitle } from "./SectionTitle"

interface FeaturedProductsProps {
  products: IProduct[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <Box>
      <SectionTitle>Sản phẩm nổi bật</SectionTitle>
      <Box w={{ ...responsiveW }} mx="auto">
        <Tabs align="center">
          <TabList
            position="sticky"
            top="0"
            bg="white"
            zIndex={zIndex.featuredTabs}
          >
            <Tab>Áo</Tab>
            <Tab>Quần</Tab>
            <Tab>Phụ kiện</Tab>
          </TabList>
          <TabPanels>
            {["shirt", "pant", "accessory"].map((type) => (
              <TabPanel key={"mustHave" + type} px="0">
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
                      <ProductItem
                        data={product}
                        key={"featured" + product.id}
                      />
                    ))}
                </Grid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Center my="6">
          <CustomLink href="/products">
            <Button>Khám phá gian hàng của DD Store</Button>
          </CustomLink>
        </Center>
      </Box>
    </Box>
  )
}
