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
import React, { useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { colors } from "styles/theme"
import { formatCurrency } from "utils/formatCurrency"
import { getFallbackImage } from "utils/getFallbackImage"
import CustomLink from "../../../components/CustomLink"
import ImageBox from "../../../components/ImageBox"

interface ProductCardProps {
  data: IProduct
  layout: "vertical" | "horizontal"
}

const colorItems = ["red", "white", "black"]

export default function ProductCard({ data, layout }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  if (layout === "vertical")
    return (
      <CustomLink href={`/products/${data.id}`}>
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
            <HStack pos="absolute" bottom="12px" w="100%" px="3" spacing="2px">
              {colorItems.map((item, idx) => (
                <Box
                  w="35px"
                  h="20px"
                  p="1px"
                  border={`2px solid ${
                    selectedColor === idx ? "#2F5ACF" : "transparent"
                  }`}
                  borderRadius="8"
                  cursor="pointer"
                  onClick={() => setSelectedColor(idx)}
                  key={idx}
                >
                  <Box w="100%" h="100%" borderRadius="8" bg={item} />
                </Box>
              ))}
            </HStack>
          </Box>
          <Box mt="2">{renderProductInfo(data)}</Box>
        </Box>
      </CustomLink>
    )
  if (layout === "horizontal")
    return (
      <CustomLink href={`/products/${data.id}`}>
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
      </CustomLink>
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
