import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Square,
  Tag,
  Text,
} from "@chakra-ui/react"
import { IProduct } from "interfaces/IProduct"
import Image from "next/image"
import React from "react"
import { AiFillHeart } from "react-icons/ai"
import { colors } from "styles/theme"
import { formatCurrency } from "utils/formatCurrency"
import { getFallbackImage } from "utils/getFallbackImage"
import ImageBox from "../../../components/ImageBox"
import NextLink from "../../../components/NextLink"

interface ProductCardProps {
  data: IProduct
  layout: "vertical" | "horizontal"
}

export default function ProductCard({ data, layout }: ProductCardProps) {
  if (layout === "vertical")
    return (
      <NextLink href={`/products/${data.id}`}>
        <Box>
          <Box pos="relative">
            <AspectRatio ratio={3 / 4} borderRadius="8" overflow="hidden">
              <ImageBox
                src={data.images[0] || getFallbackImage(500)}
                alt={data.name}
              />
            </AspectRatio>
            <Flex
              pos="absolute"
              top="12px"
              w="100%"
              px="3"
              justify="space-between"
              alignItems="center"
            >
              {data.isSale ? (
                <Tag fontWeight="500" color="#fff" backgroundColor={colors.red}>
                  SALE
                </Tag>
              ) : (
                <Box />
              )}
              <AiFillHeart color="white" fontSize="22" cursor="pointer" />
            </Flex>
          </Box>
          <Box mt="2">{renderProductInfo(data)}</Box>
        </Box>
      </NextLink>
    )
  if (layout === "horizontal")
    return (
      <NextLink href={`/products/${data.id}`}>
        <HStack>
          <Square size="40px" borderRadius="6" overflow="hidden">
            <Image
              src={data.images[0] || getFallbackImage(40)}
              width="100%"
              height="100%"
            />
          </Square>
          <Box>{renderProductInfo(data)}</Box>
        </HStack>
      </NextLink>
    )
  return null
}
function renderProductInfo(data: IProduct) {
  return (
    <>
      <Text textAlign="left" fontWeight="700">
        {data.name}
      </Text>
      <HStack fontSize="12" fontWeight="500">
        <Text>{formatCurrency(data.isSale ? data.salePrice : data.price)}</Text>

        {data.isSale && (
          <>
            <Text color={colors.gray} textDecor="line-through">
              {formatCurrency(data.price)}
            </Text>
            <Tag size="sm" bg={colors.red} color="#fff">
              -{Math.round(100 - (data.salePrice / data.price) * 100)}%
            </Tag>
          </>
        )}
      </HStack>
    </>
  )
}
