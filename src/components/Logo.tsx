import { Flex } from "@chakra-ui/react"
import React from "react"
import ImageBox from "./ImageBox"
import NextLink from "./NextLink"

export default function Logo() {
  return (
    <Flex>
      <NextLink href="/">
        <Flex alignItems="center">
          <ImageBox width="40px" ratio={1} alt="logo" />
        </Flex>
      </NextLink>
    </Flex>
  )
}
