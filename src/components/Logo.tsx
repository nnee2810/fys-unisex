import { Flex } from "@chakra-ui/react"
import { NextImage, NextLink } from "."

export function Logo() {
  return (
    <Flex>
      <NextLink href="/">
        <Flex alignItems="center">
          <NextImage w="40px" ratio={1} alt="logo" />
        </Flex>
      </NextLink>
    </Flex>
  )
}
