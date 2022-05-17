import { Box, Flex, Heading } from "@chakra-ui/react"
import { pagePadding, responsiveW } from "configs/constants"
import FormSignUp from "modules/auth/components/FormSignUp"
import React from "react"

export default function SignUp() {
  return (
    <Flex
      w={{ ...responsiveW }}
      mx="auto"
      py={pagePadding}
      flexDir="column"
      alignItems="center"
    >
      <Heading>Đăng ký</Heading>
      <Box w={{ base: "100%", md: "600px" }} mt="8">
        <FormSignUp />
      </Box>
    </Flex>
  )
}
