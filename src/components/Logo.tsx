import { Flex } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import { getFallbackImage } from "utils/getFallbackImage"
import NextLink from "./NextLink"

export default function Logo() {
  return (
    <Flex>
      <NextLink href="/">
        <Flex alignItems="center">
          <Image src={getFallbackImage(40)} width="40" height="40" alt="logo" />
        </Flex>
      </NextLink>
    </Flex>
  )
}
