import { Box, Center, Grid, Heading } from "@chakra-ui/react"
import { ImageBox, NextLink } from "components"
import { responsiveW } from "configs/constants"
import { exploreItems } from "../constants"

export function Explore() {
  return (
    <Box>
      <Heading textAlign="center">Khám phá</Heading>
      <Box w={{ ...responsiveW }} mt="6" mx="auto">
        <Grid
          templateColumns={{ base: "auto", md: "repeat(3, 1fr)" }}
          gap={{ base: "2", md: "4" }}
          borderRadius="8"
        >
          {exploreItems.map((item, idx) => (
            <NextLink href={item.href} key={idx}>
              <Box
                h={{ base: "250px", lg: "500px" }}
                borderRadius="8"
                filter="grayscale(50%)"
                transition="all .2s"
                overflow="hidden"
                _hover={{
                  filter: "grayscale(0%)",
                }}
              >
                <ImageBox h="100%" src={item.src} alt={"explore" + idx} />
                <Center position="absolute" bottom="50%" w="100%">
                  <Box
                    w="80%"
                    py="2.5"
                    bg="white"
                    textAlign="center"
                    fontWeight="700"
                    borderRadius="16"
                  >
                    {item.name}
                  </Box>
                </Center>
              </Box>
            </NextLink>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
