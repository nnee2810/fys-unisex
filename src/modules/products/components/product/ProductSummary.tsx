import { Box, HStack, Tag, Text } from "@chakra-ui/react"
import StyledRate from "components/StyledRate"
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
      <Box fontSize="20">{data.name}</Box>
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
      <HStack>
        <StyledRate disabled size={24} />
        <Box>|</Box>
        <Text>
          <u>Đánh giá:</u> 1000
        </Text>
        <Box>|</Box>
        <Text>
          <u>Đã bán:</u> 1000
        </Text>
      </HStack>
    </Box>
  )
}
