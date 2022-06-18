import { Box, Flex, HStack, Tag, Text } from "@chakra-ui/react"
import { NextImage, NextLink } from "components"
import { AiFillHeart } from "react-icons/ai"
import { Color } from "styles/theme"
import { formatCurrency } from "utils"
import { IProductEntity } from "../interfaces"

interface ProductCardProps {
  data: IProductEntity
  layout: "vertical" | "horizontal"
}

export function ProductCard({ data, layout }: ProductCardProps) {
  if (layout === "vertical")
    return (
      <Box>
        <Box pos="relative">
          <NextLink href={`/products/${data.id}`}>
            <NextImage
              src={data.images[0]}
              alt={data.name}
              borderRadius="8"
              ratio={3 / 4}
            />
          </NextLink>
          <Flex
            pos="absolute"
            top="12px"
            w="100%"
            px="3"
            justify="space-between"
            alignItems="center"
          >
            {data.in_sale ? (
              <Tag fontWeight="500" color="#fff" backgroundColor={Color.RED}>
                SALE
              </Tag>
            ) : (
              <Box />
            )}
            <AiFillHeart color="white" fontSize="22" cursor="pointer" />
          </Flex>
        </Box>
        <Box mt="2">{renderProductInfo({ data, layout })}</Box>
      </Box>
    )
  if (layout === "horizontal")
    return (
      <NextLink href={`/products/${data.id}`}>
        <HStack>
          <NextImage
            src={data.images[0]}
            alt="product"
            w="40px"
            borderRadius="6"
            ratio={1}
          />
          <Box>{renderProductInfo({ data, layout })}</Box>
        </HStack>
      </NextLink>
    )
  return null
}
function renderProductInfo({ data, layout }: ProductCardProps) {
  return (
    <>
      {layout === "vertical" ? (
        <NextLink href={`/products/${data.id}`}>
          <Text textAlign="left" fontWeight="700">
            {data.name}
          </Text>
        </NextLink>
      ) : (
        <Text textAlign="left" fontWeight="700">
          {data.name}
        </Text>
      )}

      <HStack fontSize="12" fontWeight="500">
        <Text>
          {formatCurrency(data.in_sale ? data.sale_price : data.price)}
        </Text>

        {data.in_sale && (
          <>
            <Text color={Color.GRAY} textDecor="line-through">
              {formatCurrency(data.price)}
            </Text>
            <Tag size="sm" bg={Color.RED} color="#fff">
              -{data.sale_percent}%
            </Tag>
          </>
        )}
      </HStack>
    </>
  )
}
