import { Box, Flex, Heading } from "@chakra-ui/react"
import { pagePadding, responsiveW } from "configs/constants"
import FormSignIn from "modules/auth/components/FormSignIn"
import React from "react"

export default function SignIn() {
  return (
    <Flex
      w={{ ...responsiveW }}
      mx="auto"
      py={pagePadding}
      flexDir="column"
      alignItems="center"
    >
      <Heading>Đăng nhập</Heading>
      <Box w={{ base: "100%", md: "600px" }} mt="8">
        <FormSignIn />
      </Box>
    </Flex>
  )
}
