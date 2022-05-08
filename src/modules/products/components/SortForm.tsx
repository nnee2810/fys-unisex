import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import { useRouter } from "next/router"
import qs from "query-string"
import React from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { colors } from "styles/theme"
import { sortOptions } from "../constants"
import { GetProductsDto } from "../dto/get-products-dto"

interface SortProps {
  query: GetProductsDto
  data?: IPaginationResponse<IProduct[]>
  isLoading?: boolean
}

export default function Sort({ query, data, isLoading }: SortProps) {
  const router = useRouter()

  const handleSort = (value: string) => {
    const queryString = qs.stringify({
      ...query,
      sort: value,
    })
    router.push(`?${queryString}`)
  }
  const handleChangePage = (value: number) => {
    console.log(value)

    if (!data) return
    if (value < 0 || value >= Math.ceil(data.total / data.limit)) return

    const queryString = qs.stringify({
      ...query,
      page: value,
    })
    router.push(`?${queryString}`)
  }

  return (
    <Flex
      justifyContent="space-between"
      px="5"
      py="2"
      bg={colors.lightGray}
      borderRadius="4"
    >
      <HStack>
        <Text>Sắp xếp theo</Text>
        {sortOptions.map((option) => (
          <Box
            px="4"
            py="2"
            bg={option.value === query.sort ? colors.primary : "#fff"}
            color={option.value === query.sort ? "#fff" : colors.primary}
            borderRadius="4"
            cursor="pointer"
            key={option.value}
            onClick={() => handleSort(option.value as string)}
          >
            {option.label}
          </Box>
        ))}
      </HStack>
      {data?.data?.length ? (
        <HStack>
          <BiChevronLeft
            fontSize="20"
            cursor="pointer"
            onClick={() => handleChangePage(data?.page - 1)}
          />
          <Text>
            <b>{data?.page + 1}</b>/{Math.ceil(data?.total / data?.limit)}
          </Text>
          <BiChevronRight
            fontSize="20"
            cursor="pointer"
            onClick={() => handleChangePage(data?.page + 1)}
          />
        </HStack>
      ) : null}
    </Flex>
  )
}
