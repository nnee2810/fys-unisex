import { Box, Center, Flex } from "@chakra-ui/react"
import { NextLink } from "components"
import { responsiveW } from "configs/constants"
import { getFallbackImg } from "utils"

export function Story() {
  return (
    <Flex justifyContent="center" my="60px">
      <NextLink href="#">
        <Center
          w={{ ...responsiveW }}
          h="500px"
          borderRadius="16"
          bgImg={getFallbackImg(500)}
          className="bg-fit"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box
            bgColor="#00000054"
            p="4"
            borderRadius="32"
            color="white"
            fontSize="20"
          >
            Câu chuyện về FYS Unisex
          </Box>
        </Center>
      </NextLink>
    </Flex>
  )
}
