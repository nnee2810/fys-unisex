import { Box, Center, Grid } from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import { exploreItems, responsiveW } from "configs/constants"
import { SectionTitle } from "modules/home/components/SectionTitle"
import Image from "next/image"
import React from "react"

export default function Explore() {
  return (
    <Box>
      <SectionTitle>Khám phá</SectionTitle>
      <Box w={{ ...responsiveW }} mt="24px" mx="auto">
        <Grid
          templateColumns={{ base: "auto", md: "repeat(3, 1fr)" }}
          gap={{ base: "2", md: "4" }}
          borderRadius="8"
        >
          {exploreItems.map((item, idx) => (
            <CustomLink href={item.href} key={"explore" + idx}>
              <Box
                position="relative"
                h={{ base: "250px", lg: "500px" }}
                borderRadius="8"
                filter="grayscale(50%)"
                transition="all .25s"
                overflow="hidden"
                _hover={{
                  filter: "grayscale(0%)",
                }}
              >
                <Image
                  src={item.src}
                  width="100%"
                  height="100%"
                  layout="fill"
                  objectFit="cover"
                />
                <Center position="absolute" w="100%" h="100%">
                  <Box
                    w="200px"
                    py="6px"
                    bg="white"
                    textAlign="center"
                    fontWeight="700"
                    borderRadius="15"
                  >
                    {item.name}
                  </Box>
                </Center>
              </Box>
            </CustomLink>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
