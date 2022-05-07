import { AspectRatio, Box, Flex, HStack, Text } from "@chakra-ui/react"
import { IProduct } from "interfaces/IProduct"
import Image from "next/image"
import React, { useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { colors } from "styles/theme"
import { formatCurrency } from "utils/formatCurrency"
import { getFallbackImage } from "utils/getFallbackImage"
import CustomLink from "./CustomLink"

interface ProductItemProps {
  data: IProduct
}

const colorItems = ["red", "white", "black"]

export default function ProductItem({ data }: ProductItemProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  return (
    <Box>
      <Box pos="relative">
        <CustomLink href={`/products/${data._id}`}>
          <AspectRatio ratio={3 / 4} borderRadius="8" overflow="hidden">
            <Image
              src={data.images[0] || getFallbackImage(500)}
              layout="fill"
              objectFit="cover"
            />
          </AspectRatio>
        </CustomLink>
        <Flex
          pos="absolute"
          top="12px"
          w="100%"
          px="3"
          justify="space-between"
          alignItems="center"
        >
          {data.isSale ? (
            <Box
              bg="red"
              px="6px"
              color="white"
              fontSize="12"
              fontWeight="700"
              borderRadius="4px"
            >
              SALE
            </Box>
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
              borderRadius="10"
              cursor="pointer"
              onClick={() => setSelectedColor(idx)}
              key={"productColor" + data._id + idx}
            >
              <Box w="100%" h="100%" borderRadius="10" bg={item} />
            </Box>
          ))}
        </HStack>
      </Box>
      <Box mt="2">
        <CustomLink href={`/products/${data._id}`}>
          <Text align="left" fontWeight="700">
            {data.name}
          </Text>
        </CustomLink>
        <HStack fontWeight="500" fontSize="12">
          {data.isSale ? (
            <>
              <Text color={colors.red}>{formatCurrency(data.salePrice)}</Text>
              <Text color={colors.gray} textDecor="line-through">
                {formatCurrency(data.price)}
              </Text>
              <Text color={colors.red}>
                -{Math.round(100 - (data.salePrice / data.price) * 100)}%
              </Text>
            </>
          ) : (
            <Text>{formatCurrency(data.price)}</Text>
          )}
        </HStack>
      </Box>
    </Box>
  )
}
