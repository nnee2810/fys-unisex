import { Box, Center, Flex } from "@chakra-ui/react"
import NextLink from "components/NextLink"
import { responsiveW } from "configs/constants"
import React from "react"
import { generateFallbackImage } from "utils/generateFallbackImage"

export default function Story() {
  return (
    <Flex justifyContent="center" my="60px">
      <NextLink href="#">
        <Center
          w={{ ...responsiveW }}
          h="500px"
          borderRadius="16"
          bgImg={generateFallbackImage(500)}
          className="bg-fit"
        >
          <Box
            bg="#00000054"
            p="4"
            borderRadius="32"
            color="white"
            fontSize="20"
          >
            Câu chuyện về DD Store
          </Box>
        </Center>
      </NextLink>
    </Flex>
  )
}
