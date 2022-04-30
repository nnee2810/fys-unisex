import { Box, Center, Flex } from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import { responsiveW } from "configs/constants"
import React from "react"
import { getFallbackImage } from "utils/getFallbackImage"

export default function Story() {
  return (
    <Flex justifyContent="center" my="60px">
      <CustomLink href="#">
        <Center
          w={{ ...responsiveW }}
          h="500px"
          borderRadius="24"
          bgImg={getFallbackImage(500)}
          className="bg-fit"
        >
          <Box
            bg="#00000054"
            p="4"
            borderRadius="36"
            color="white"
            fontSize="20"
          >
            Câu chuyện về DD Store
          </Box>
        </Center>
      </CustomLink>
    </Flex>
  )
}
