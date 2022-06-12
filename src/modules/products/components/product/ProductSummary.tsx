import { Box, Flex, Heading, HStack, Tag, Text } from "@chakra-ui/react"
import { NextLink, Rate } from "components"
import { IProduct } from "interfaces"
import { Color } from "styles/theme"
import { formatCurrency } from "utils"

interface ProductSummaryProps {
  data: IProduct
}

export function ProductSummary({ data }: ProductSummaryProps) {
  return (
    <Box>
      <Heading as="h1">{data.name}</Heading>
      <HStack spacing="3" fontSize="26" fontWeight="500">
        <Text>{formatCurrency(data.inSale ? data.salePrice : data.price)}</Text>

        {data.inSale && (
          <>
            <Text color={Color.GRAY} textDecor="line-through">
              {formatCurrency(data.price)}
            </Text>
            <Tag bg={Color.RED} color="#fff">
              -{data.salePercent}%
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
