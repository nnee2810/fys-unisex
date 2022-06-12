import { Flex } from "@chakra-ui/react"
import { ImageBox, NextLink } from "."

export function Logo() {
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
