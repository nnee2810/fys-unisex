import { Box, Flex, HStack, Tag, Text } from "@chakra-ui/react"
import NextLink from "components/NextLink"
import Rate from "components/Rate"
import { IProduct } from "interfaces/IProduct"
import React from "react"
import { colors } from "styles/theme"
import { formatCurrency } from "utils/formatCurrency"

interface ProductSummaryProps {
  data: IProduct
}

export default function ProductSummary({ data }: ProductSummaryProps) {
  return (
    <Box>
      <Text fontSize="20">{data.name}</Text>
      <HStack spacing="3" fontSize="26" fontWeight="500">
        <Text>{formatCurrency(data.isSale ? data.salePrice : data.price)}</Text>

        {data.isSale && (
          <>
            <Text color={colors.gray} textDecor="line-through">
              {formatCurrency(data.price)}
            </Text>
            <Tag bg={colors.red} color="#fff">
              -{Math.round(100 - (data.salePrice / data.price) * 100)}%
            </Tag>
          </>
        )}
      </HStack>
      <Flex>
        <NextLink href="#reviews">
          <HStack>
            <Rate disabled size={24} value={4} />
            <Box>|</Box>
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
