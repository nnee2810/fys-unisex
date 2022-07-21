import { Box, Flex, Heading, HStack, Tag, Text } from "@chakra-ui/react"
import { NextLink, NextRate } from "components"
import { IProductEntity } from "modules/products/interfaces"
import { Color } from "styles/theme"
import { formatCurrency } from "utils"

interface ProductSummaryProps {
  data: IProductEntity
}

export function ProductSummary({ data }: ProductSummaryProps) {
  return (
    <Box>
      <Heading as="h1">{data.name}</Heading>
      <HStack spacing="3" fontSize="26" fontWeight="500">
        <Text>
          {formatCurrency(data.in_sale ? data.sale_price : data.price)}
        </Text>

        {data.in_sale && (
          <>
            <Text color={Color.GRAY} textDecor="line-through">
              {formatCurrency(data.price)}
            </Text>
            <Tag bgColor={Color.RED} color="#fff">
              -{data.sale_percent}%
            </Tag>
          </>
        )}
      </HStack>
      <Flex>
        <NextLink href="#reviews">
          <HStack>
            <NextRate disabled size={24} value={4} />
            <Text>|</Text>
            <Text>
              <u>Đánh giá:</u> 1000
            </Text>
            <Box>|</Box>
            <Text>
              <u>Đã bán:</u> 1000
            </Text>
          </HStack>
        </NextLink>
      </Flex>
    </Box>
  )
}
